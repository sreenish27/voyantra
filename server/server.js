import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

//Establish a way to bring env variables from the env file
dotenv.config();

const app = express();

const DB_CONNECTION = process.env.DB_URI;
const PORT = process.env.PORT;

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

//Routes
app.get('/', (req, res) => {
    res.send("Welcome to Voyantra!");
});

app.get('/dashboard', (req, res) => {
    res.send("A clear view all your past, present and future trips including spending, places, etc in one place!");
});









