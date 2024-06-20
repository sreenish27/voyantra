import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {DB_CONNECTION, PORT} from './config.js';
import FlightDataController from './controller/flightDataController.js';
import storeAllTierFlightData from './modelControllerInteraction/flightDataCreation.js';
import storeAllTierStaytData from './modelControllerInteraction/stayDataCreation.js';
import { setRawUserInput, getRawUserInput } from './userInputStore.js';
import processUserInput from './handleUserInput.js';
import { setApiReadyInput, getApiReadyUserInput } from './apiReadyUserInputStore.js';
import StayDataController from './controller/stayDataController.js';
import allTripCards from './modelControllerInteraction/tripCardCreation.js';
import fetchAirlineData from './createdApis/airlineApi.js';
import fetchAirportData from './createdApis/airportApi.js';
import fetchTripCardData from './createdApis/tripCardClientSideapi.js';


export const app = express();


app.use(cors({
    origin:"http://localhost:3000"
}));

app.use(express.json());

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
    res.send(`Welcome to Voyantra!`);
});

//recieve all user input from client side
app.post('/api/userInput', (req, res) => {

    const userinput = req.body;
    try{
        setRawUserInput(JSON.stringify(userinput));
    } catch (err) {
        console.log(`Error in the json stringify of user input: ${err}`);
    }
    

    res.setHeader('Content-Type','application/json');
    res.send(`Here is the user input:${getRawUserInput()}`);
    try{
        setApiReadyInput(processUserInput(getRawUserInput()));
        console.log(getApiReadyUserInput());
    } catch(err){
        console.log(`Error in processing user input: ${err}`);
        throw err;
    }
});


//Dashboard route - It must have all individual user specific useful details in it
app.get('/dashboard', (req, res) => {
    res.send(`A clear view all your past, present and future trips including spending, places, etc in one place!`);
});
//calling the processed input here so that it can be used for all 3 controllers - flight, stay and rental car

//Get the flight data to process further to put into MongoDB and process it
app.get('/api/testing/flight', async (req, res) => {
    const processedInput = getApiReadyUserInput();
    const output = await FlightDataController(processedInput)
    res.send(output);
    storeAllTierFlightData(output);
});

//Get the Stay data to process further to put into MongoDB and process it
app.get('/api/testing/stay', async(req, res) => {
    const processedInput = getApiReadyUserInput();
    const output = await StayDataController(processedInput);
    res.send(output);
    storeAllTierStaytData(output);
    allTripCards();
})

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

//checking if I am getting the trip card data and also setting up the endpoint simultaneously
app.get('/api/testing/tripcards', async(req, res) => {
    try{
        const response = await fetchTripCardData();
        res.send(response);
    } catch(err){
        console.log(`Error in getting the trip cards: ${err}`);
    }
   
})





