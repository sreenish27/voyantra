import { Flight } from "../models/flightModel.js";
import { Stay } from "../models/stayModel.js";
import { TripCard } from "../models/tripCardModel.js";

//iterating through all the flight and stay objects to create all combinations meaning, x flights, y stays, then I will get x*y trip cards
const allTripCards = async () => {

    // //getting the flights and stays collection from MongoDB to create the tripCard object which will be used to present these cards on the client side
    const flightsArray = await Flight.find({});
    const staysArray =  await Stay.find({});

    //get the number of objects in each collection
    const flightsArrayLength = flightsArray.length;
    const stayArrayLength = staysArray.length;

    //a function to create the tripCard object which will later be used to created multiple cards
    const tripCardDataCreation = async (flightObject, stayObject) => {

        const newTripCard = new TripCard({
            flight: flightObject,
            stay: stayObject,
        })

        //save the data in MongoDB
        try{
            newTripCard.save();
        } catch(err){
            console.log(`Error in saving the Trip Card Data in MongoDB`);
            }
        } 
    
    //a for loop to create all combinations of trip cards
    for(let i =0; i < flightsArrayLength; i++){
        for(let j=0; j<stayArrayLength; j++){
            tripCardDataCreation(flightsArray[i], staysArray[j]);
        }
    }
}

export default allTripCards;

