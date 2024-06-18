// import { flight_db } from '../server.js';
import mongoose from "mongoose";

const flight_DB_URL = 'mongodb+srv://krithiksaisreenishg:Hello1234@voyantracluster.gguci1x.mongodb.net/AirportAirlineInfo?retryWrites=true&w=majority&appName=VoyantraCluster';

export const flight_db = mongoose.createConnection(flight_DB_URL);

//get the airline name from it's IATA code
const fetchAirlineData = async (iataCode) => {

    try{

        
        //accesing the airline collection inside the database
        const airlineCollection = flight_db.collection('AirlineData');

        const airlineInfo = await airlineCollection.findOne({'IATA code':iataCode});

        const airline = airlineInfo.airlineName;

        return airline;

    } catch (err){
        console.log(`Error in fetching the airline data from the database: ${err}`);
        throw err;
    }

}

export default fetchAirlineData;



