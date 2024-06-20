import { TripCard } from "../models/tripCardModel.js";

const fetchTripCardData = async () => {

    try{
        const tripCardsArray = await TripCard.find({});
        return tripCardsArray;
    }catch(err){
        console.log(`Error while getting the trip cards from the database: ${err}`);
    }

}

export default fetchTripCardData;
