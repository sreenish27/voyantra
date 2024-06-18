import { Flight } from "../models/flightModel.js";
import moment from "moment";
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

    //function to calculate the layover time
    const layoverCalc = (iternaryData, i) => {
        const startTime = moment(iternaryData[i].departure.at);
        const endTime = moment(iternaryData[i-1].arrival.at);

        const layover = moment.duration(endTime.diff(startTime));

        const layoverDuration = `${(-1)*layover.hours()} hours ${(-1)*layover.minutes()} minutes`;

        return layoverDuration;
    }


    const newFlightData = new Flight({

        totalFlightPrice: flightsDataObject[chosenFlightDataObject].price.grandTotal,
        departingFlights: {
            flightNumber1: departureSegmentData[0].carrierCode + departureSegmentData[0].number,
            airline1: departureSegmentData[0].carrierCode,
            airport1: departureSegmentData[0].departure.iataCode,
            departureTime1: departureSegmentData[0].departure.at,
            duration1: departureSegmentData[0].duration,
            arrivalTime1: departureSegmentData[0].arrival.at,
            layoverTime1: departureSegmentData[1] ? layoverCalc(departureSegmentData, 1) : null,
            flightNumber2: departureSegmentData[1] ? departureSegmentData[1].carrierCode + departureSegmentData[1].number : null,
            airline2: departureSegmentData[1] ? departureSegmentData[1].carrierCode : null,
            airport2: departureSegmentData[1] ? departureSegmentData[1].departure.iataCode : null,
            departureTime2: departureSegmentData[1] ? departureSegmentData[1].departure.at : null,
            duration2: departureSegmentData[1] ? departureSegmentData[1].duration : null,
            arrivalTime2: departureSegmentData[1] ? departureSegmentData[1].arrival.at : null,
            layoverTime2: departureSegmentData[2] ? layoverCalc(departureSegmentData, 2) : null,
            flightNumber3:departureSegmentData[2] ? departureSegmentData[2].carrierCode + departureSegmentData[2].number : null,
            airline3: departureSegmentData[2] ? departureSegmentData[2].carrierCode : null,
            airport3: departureSegmentData[2] ? departureSegmentData[2].departure.iataCode : null,
            departureTime3: departureSegmentData[2] ? departureSegmentData[2].departure.at : null,
            duration3: departureSegmentData[2] ? departureSegmentData[2].duration : null,
            arrivalTime3: departureSegmentData[2] ? departureSegmentData[2].arrival.at : null,
            destinationAirport: departureSegmentData[2] ? departureSegmentData[2].arrival.iataCode : departureSegmentData[1] ? departureSegmentData[1].arrival.iataCode : departureSegmentData[0].arrival.iataCode,
        },
        returningFlights: {
            flightNumber1: returnSegmentData[0].carrierCode + returnSegmentData[0].number,
            airline1: returnSegmentData[0].carrierCode,
            airport1: returnSegmentData[0].departure.iataCode,
            departureTime1: returnSegmentData[0].departure.at,
            duration1: returnSegmentData[0].duration,
            arrivalTime1: returnSegmentData[0].arrival.at,
            layoverTime1: returnSegmentData[1] ? layoverCalc(returnSegmentData, 1) : null,
            flightNumber2: returnSegmentData[1] ? returnSegmentData[1].carrierCode + returnSegmentData[1].number : null,
            airline2: returnSegmentData[1] ? returnSegmentData[1].carrierCode : null,
            airport2: returnSegmentData[1] ? returnSegmentData[1].departure.iataCode : null,
            departureTime2: returnSegmentData[1] ? returnSegmentData[1].departure.at : null,
            duration2: returnSegmentData[1] ? returnSegmentData[1].duration : null,
            arrivalTime2: returnSegmentData[1] ? returnSegmentData[1].arrival.at : null,
            layoverTime2: returnSegmentData[2] ? layoverCalc(returnSegmentData, 2) : null,
            flightNumber3: returnSegmentData[2] ? returnSegmentData[2].carrierCode + returnSegmentData[2].number : null,
            airline3: returnSegmentData[2] ? returnSegmentData[2].carrierCode : null,
            airport3: returnSegmentData[2] ? returnSegmentData[2].departure.iataCode : null,
            departureTime3: returnSegmentData[2] ? returnSegmentData[2].departure.at : null,
            duration3: returnSegmentData[2] ? returnSegmentData[2].duration : null,
            arrivalTime3: returnSegmentData[2] ? returnSegmentData[2].arrival.at : null,
            originAirport: returnSegmentData[2] ? returnSegmentData[2].arrival.iataCode : returnSegmentData[1] ? returnSegmentData[1].arrival.iataCode : returnSegmentData[0].arrival.iataCode,
        },
        
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



