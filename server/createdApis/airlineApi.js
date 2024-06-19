import mongoose from "mongoose";
import { flight_DB_CONNECTION } from "../config.js";

export const flight_db = mongoose.createConnection(flight_DB_CONNECTION);

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



