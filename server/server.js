import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {DB_CONNECTION, PORT} from './config.js';
import getAllFlightData from './controller/flightDataController.js';
import { setRawUserInput, getRawUserInput } from './userInputStore.js';


export const app = express();


app.use(cors({
    origin:"http://localhost:3000"
}));

app.use(express.json());


try {
    mongoose.connect(DB_CONNECTION).then(() => {
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

// import { globaluserinput } from './config.js';


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
});


//Dashboard route - It must have all individual user specific useful details in it
app.get('/dashboard', (req, res) => {
    res.send(`A clear view all your past, present and future trips including spending, places, etc in one place!`);
});

app.get('/api/testing', async (req, res) => {
    const output = await getAllFlightData();
    res.send(output);
});






