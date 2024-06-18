import { flight_db } from "./airlineApi.js";
import mongoose from "mongoose";

//get the airline name from it's IATA code
const fetchAirportData = async (iataCode) => {

    try{

        
        //accesing the airline collection inside the database
        const airportCollection = flight_db.collection('AirportsData');

        const airportInfo = await airportCollection.findOne({'IATA code':iataCode});

        const airport = airportInfo.airportName;

        return airport;

    } catch (err){
        console.log(`Error in fetching the airline data from the database: ${err}`);
        throw err;
    }

}

const testdata = await fetchAirportData('AMS');

console.log(testdata);

export default fetchAirportData;