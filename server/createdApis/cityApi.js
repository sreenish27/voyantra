import { flight_db } from "./airlineApi.js";

//get the city name from it's IATA code
const fetchCityData = async (iataCode) => {

    try{

        
        //accesing the airline collection inside the database
        const airportCollection = flight_db.collection('AirportsData');

        const airportInfo = await airportCollection.findOne({'IATA code':iataCode});

        const airport = airportInfo.City;

        return airport;

    } catch (err){
        console.log(`Error in fetching the city data from the database: ${err}`);
        throw err;
    }

}

export default fetchCityData;