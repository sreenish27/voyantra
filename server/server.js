import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {DB_CONNECTION, PORT} from './config.js';
import FlightDataController from './controller/flightDataController.js';
import storeAllTierFlightData from './modelControllerInteraction/flightDataCreation.js';
import storeAllTierStaytData from './modelControllerInteraction/stayDataCreation.js';
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
        socketTimeoutMS: 30000
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

    const userinput = req.body;
    
    try{
        setApiReadyInput(processUserInput(JSON.stringify(userinput)));
        console.log(getApiReadyUserInput());
    } catch(err){
        console.log(`Error in processing user input: ${err}`);
        throw err;
    }

    const processedInput = getApiReadyUserInput();

    //this is the part where the flight data gets stored
    const flight_output = await FlightDataController(processedInput)
    storeAllTierFlightData(flight_output);

    //the part where stay data gets stored
    const stay_output = await StayDataController(processedInput);
    storeAllTierStaytData(stay_output);

    //the part where trip cards are created
    allTripCards();
});

app.get('/api/userInput', async (req, res) => {
    try{
        const response = await fetchTripCardData();
        return response;
    } catch(err){
        console.log(`Error in getting the tripcards from the database: ${err}`);
    }
})


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

//checking if I am getting the trip card data and also setting up the endpoint simultaneously
app.get('/api/testing/tripcards', async(req, res) => {
    try{
        const response = await fetchTripCardData();
        res.send(response);
    } catch(err){
        console.log(`Error in getting the trip cards: ${err}`);
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





