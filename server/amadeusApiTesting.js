//will delete this file - just using it for testing purposes everything will handled spearately and in folders
import { amadeusObj } from './config.js';

const testFlightApi = async () => {
    
    try{
        const response = await amadeusObj.shopping.flightOffersSearch.get({
            originLocationCode:'BOS',
            destinationLocationCode:'SFO',
            departureDate:'2024-06-12',
            returnDate:'2024-06-22',
            adults:2,
            children:2,
            infants:1,
            travelClass:'ECONOMY',
            currencyCode:'USD',
            max:10
        })

        return response;

    } catch(err){
        console.log(`Error in retrieving flight information:${err}`);
        return err;
    }
}

export default testFlightApi;