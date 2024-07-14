import { Flight } from "../models/flightModel.js";
import { Stay } from "../models/stayModel.js";
import { TripCard } from "../models/tripCardModel.js";

//iterating through all the flight and stay objects to create all combinations meaning, x flights, y stays, then I will get x*y trip cards
const allTripCards = async (sessionid) => {


    //store the sessionid in this variable
    const sessionId = sessionid;

    //check if the stay data is in mongoDB before going ahead and storing them and stuff
    const staysExist = await Stay.exists({ SessionId: sessionId});

    if(!staysExist){
        await new Promise(resolve => setTimeout(resolve, 20000));
    }

    // //getting the flights and stays collection from MongoDB to create the tripCard object which will be used to present these cards on the client side
    const flightsArray = await Flight.find({SessionId: sessionId });
    const staysArray =  await Stay.find({SessionId: sessionId });

    //get the number of objects in each collection
    const flightsArrayLength = flightsArray.length;
    const stayArrayLength = staysArray.length;

    //creating a total number of tripcards metric to use it in client side to get all the cards accurately
    const totalNoOfTripCards = flightsArrayLength * stayArrayLength;

    // //the total price of the trip (adding stay and flight total price)
    // const totalPrice = (flightObject, stayObject) => {
    //     const price = Number(flightObject.totalFlightPrice) + Number(stayObject.totalPrice);
    //     return price;
    // }

    //a function to create the tripCard object which will later be used to created multiple cards
    const tripCardDataCreation = async (flightObject, stayObject) => {

        const newTripCard = new TripCard({
            SessionId: sessionId,
            flight: flightObject,
            stay: stayObject,
            noOfTripCards: totalNoOfTripCards,
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
            await tripCardDataCreation(flightsArray[i], staysArray[j]);
        }
    }
}

export default allTripCards;

