import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {DB_CONNECTION, PORT} from './config.js';
import FlightDataController from './controller/flightDataController.js';
import storeAllTierFlightData from './modelControllerInteraction/flightDataCreation.js';
import storeAllTierStayData from './modelControllerInteraction/stayDataCreation.js';
import processUserInput from './handleUserInput.js';
import { setApiReadyInput, getApiReadyUserInput } from './apiReadyUserInputStore.js';
import StayDataController from './controller/stayDataController.js';
import allTripCards from './modelControllerInteraction/tripCardCreation.js';
import fetchAirlineData from './createdApis/airlineApi.js';
import fetchAirportData from './createdApis/airportApi.js';
import fetchTripCardData from './createdApis/tripCardClientSideapi.js';
import fetchAirlineLogo from './createdApis/airlineLogosApi.js';
import fetchCityData from './createdApis/cityApi.js';
import session from 'express-session';


export const app = express();


app.use(cors({
    origin:"http://localhost:3000"
}));

app.use(express.json());

//calling the session function
app.use(session({
    secret: 'aSdh576&*6',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: 60000 * 60 * 2,
    }
})
);

//establishing a connection to mongoDB
try {
    mongoose.connect(DB_CONNECTION, {
        socketTimeoutMS: 240000,
        connectTimeoutMS: 240000,
        serverSelectionTimeoutMS: 240000,
    }).then(() => {
        console.log("Connected to MongoDB!");
        app.listen(PORT, () => {
            console.log(`Server is running on port:${PORT}`);
        });
    
    });
} catch(error) {
    console.error("Failed to connect to MongoDB", error);
};

app.get('/', (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
    req.session.visited = true;
    res.send(`Welcome to Voyantra!`);
});

//recieve all user input from client side
app.post('/api/userInput', async (req, res) => {

    //store userinput received from client side assocaited with the correct user
    req.session.userinput = req.body;
    
    try{
        setApiReadyInput(processUserInput(JSON.stringify(req.session.userinput)));
        console.log(getApiReadyUserInput());
    } catch(err){
        console.log(`Error in processing user input: ${err}`);
        throw err;
    }
    
    //storing the processed input with the correct session
    req.session.processedInput = getApiReadyUserInput();

    //getting the session id so that I can create collection names with session id to handle multiple users (const does not make is constant always only within the scope, when a new request comes in a new session id is created so we good!)
    const sessionId = req.session.id;

    //this is the part where the flight data gets stored
    const flight_output = await FlightDataController(req.session.processedInput);
    storeAllTierFlightData(flight_output, sessionId);

    //the part where stay data gets stored
    const stay_output = await StayDataController(req.session.processedInput);
    storeAllTierStayData(stay_output, sessionId);

    //the part where trip cards are created
    await allTripCards(sessionId);

    //checking if I am getting the trip card data and also setting up the endpoint for tripcards which will be used to get the data in client-side (moving this inside my post request for 2 reasons, to use the session id correctly and to trigger it immedietly as the search button is clicked)
    app.get('/api/testing/tripcards', async(req, res) => {
        try{
            const response = await fetchTripCardData(sessionId);
            res.send(response);
        } catch(err){
            console.log(`Error in getting the trip cards: ${err}`);
        }
    
    })
});

//Dashboard route - It must have all individual user specific useful details in it
app.get('/dashboard', (req, res) => {
    res.send(`A clear view all your past, present and future trips including spending, places, etc in one place!`);
});
//creating endpoints for the AirportAirline database

//airline endpoint
app.get(`/api/testing/airline/:iataCode`, async(req, res) => {
    try{
        const iataCode = req.params.iataCode;
        const response = await fetchAirlineData(iataCode);
        res.send(response);
    } catch(err){
        res.response(500).send({err: err.message});
    }
    
})
//airport endpoint
app.get(`/api/testing/airport/:iataCode`, async(req, res) => {
    try{
        const iataCode = req.params.iataCode;
        const response = await fetchAirportData(iataCode);
        res.send(response);
    } catch(err){
        res.response(500).send({err:err.message});
    }
    
})

//city endpoint
app.get(`/api/testing/city/:iataCode`, async(req, res) => {
    try{
        const iataCode = req.params.iataCode;
        const response = await fetchCityData(iataCode);
        res.send(response);
    } catch(err){
        res.response(500).send({err:err.message});
    }
    
})

//setting up an endpoint for getting airline logos (in the form of base64 strings which will be rendered later in the client side)
app.get(`/api/testing/airlinelogo/:iatacode`, async (req, res) => {
    try{
        const iataCode = req.params.iatacode;
        const response = await fetchAirlineLogo(iataCode);
        res.send(response);
    }catch(err){
        res.response(500).send({err: err.message});
    }
})







