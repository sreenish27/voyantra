import { Flight } from "../models/flightModel.js";
// import FlightDataController from "../controller/flightDataController.js";

const FlightDataCreation = async (flightControllerData, k) => {

    // //to run and get the API response which will be used to store the info further in MongoDB
    // const flightsData = await FlightDataController(apiInput);

    //getting just the data object as that is where all the info is
    const flightsDataObject = flightControllerData.data;

    const chosenFlightDataObject = k;

    //as we are interested only in the data inside itineraries we are creating it here, to make the code clean
    const flightItinerariesData = flightsDataObject[chosenFlightDataObject].itineraries;

    //as most of our useful data is inside segments array, putting the departure segment and return segment in seperate variables to keep it clean
    const departureSegmentData = flightItinerariesData[0].segments;
    const returnSegmentData = flightItinerariesData[1].segments;


    const newFlightData = new Flight({
        departingFlights: {
            flightNumber1: departureSegmentData[0].carrierCode + departureSegmentData[0].number,
            airline1: departureSegmentData[0].carrierCode,
            airport1: departureSegmentData[0].departure.iataCode,
            departureTime1: departureSegmentData[0].departure.at,
            duration1: departureSegmentData[0].duration,
            arrivalTime1: departureSegmentData[0].arrival.at,
            layoverTime1: new Date(departureSegmentData[1].departure.at) - new Date(departureSegmentData[0].arrival.at),
            flightNumber2: departureSegmentData[1].carrierCode + departureSegmentData[1].number,
            airline2: departureSegmentData[1].carrierCode,
            airport2: departureSegmentData[1].departure.iataCode,
            departureTime2: departureSegmentData[1].departure.at,
            duration2: departureSegmentData[1].duration,
            arrivalTime2: departureSegmentData[1].arrival.at,
            layoverTime2: new Date(departureSegmentData[2].departure.at) - new Date(departureSegmentData[1].arrival.at),
            flightNumber3: departureSegmentData[2].carrierCode + departureSegmentData[2].number,
            airline3: departureSegmentData[2].carrierCode,
            airport3: departureSegmentData[2].departure.iataCode,
            departureTime3: departureSegmentData[2].departure.at,
            duration3: departureSegmentData[2].duration,
            arrivalTime3: departureSegmentData[2].arrival.at,
            destinationAirport: departureSegmentData[2].arrival.iataCode,
        },
        returningFlights: {
            flightNumber1: returnSegmentData[0].carrierCode + returnSegmentData[0].number,
            airline1: returnSegmentData[0].carrierCode,
            airport1: returnSegmentData[0].departure.iataCode,
            departureTime1: returnSegmentData[0].departure.at,
            duration1: returnSegmentData[0].duration,
            arrivalTime1: returnSegmentData[0].arrival.at,
            layoverTime1: new Date(returnSegmentData[1].departure.at) - new Date(returnSegmentData[1].arrival.at),
            flightNumber2: returnSegmentData[1].carrierCode + returnSegmentData[1].number,
            airline2: returnSegmentData[1].carrierCode,
            airport2: returnSegmentData[1].departure.iataCode,
            departureTime2: returnSegmentData[1].departure.at,
            duration2: returnSegmentData[1].duration,
            arrivalTime2: returnSegmentData[1].arrival.at,
            layoverTime2: new Date(returnSegmentData[2].departure.at) - new Date(returnSegmentData[1].arrival.at),
            flightNumber3: returnSegmentData[2].carrierCode + returnSegmentData[2].number,
            airline3: returnSegmentData[2].carrierCode,
            airport3: returnSegmentData[2].departure.iataCode,
            departureTime3: returnSegmentData[2].departure.at,
            duration3: returnSegmentData[2].duration,
            arrivalTime3: returnSegmentData[2].arrival.at,
            originAirport: returnSegmentData[2].arrival.iataCode,
        },
        totalPrice: flightsDataObject[0].price.fees.grandTotal,
    })

    //save the data in MongoDB
    try{
        newFlightData.save();
    } catch(err){
        console.log(`Error in trying to save the new flight data: ${err}`);
    }

}

//I want Economy, Premium Economy, Business, First Class (so 4 - this is a placholder, I will establish how to select later)\
const noOfFlightData = 5;

//the below is to store 4 flight objects in MongoDB
const storeAllTierFlightData = async (flightControllerData) => {

    for(let i=0; i<noOfFlightData; i++){
       await FlightDataCreation(flightControllerData, i);
    }
    
}

export default storeAllTierFlightData;



