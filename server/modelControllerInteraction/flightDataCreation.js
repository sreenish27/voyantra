import { Flight } from "../models/flightModel.js";
import moment from "moment";

const FlightDataCreation = async (flightControllerData, k, sessionid) => {

    //getting just the data object as that is where all the info is
    const flightsDataObject = flightControllerData.data;

    const chosenFlightDataObject = k;

    //store the sessionid in this variable
    const sessionId = sessionid;

    //as we are interested only in the data inside itineraries we are creating it here, to make the code clean
    const flightItinerariesData = flightsDataObject[chosenFlightDataObject].itineraries;

    //as most of our useful data is inside segments array, putting the departure segment and return segment in seperate variables to keep it clean
    const departureSegmentData = flightItinerariesData[0].segments;
    const returnSegmentData = flightItinerariesData[1].segments;

    //to process the iataCode for airline and airport and get the expanded names from the created RESTFul APIs
    //a function to make it easier to put the iataCode

    const getAirlineData = async (iataCode) => {

        const airlineUrl = `http://localhost:4000/api/testing/airline/${iataCode}`;
        const response = await fetch(airlineUrl);
        const airlineName = response.text();
        return airlineName;
    }

    const getAirportData = async (iataCode) => {

        const airportUrl = `http://localhost:4000/api/testing/airport/${iataCode}`;
        const response = await fetch(airportUrl);
        const airportName = response.text();
        const airport = airportName;
        return airport;
    }

    const getCityData = async (iataCode) => {
        const cityUrl = `http://localhost:4000/api/testing/city/${iataCode}`;
        const response = await fetch(cityUrl);
        const cityName = response.text();
        const city = cityName;
        return city;
    }
    

    //function to calculate the layover time
    const layoverCalc = (iternaryData, i) => {
        const startTime = moment(iternaryData[i].departure.at);
        const endTime = moment(iternaryData[i-1].arrival.at);

        const layover = moment.duration(endTime.diff(startTime));

        const layoverDuration = `${(-1)*layover.hours()}h ${(-1)*layover.minutes()}m`;

        return layoverDuration;
    }

    //function to get the flight time in the right format - "x hours y minutes"
    const flightTime = (flightDuration) => {

        const momentFlightDuration = moment.duration(flightDuration);
        const flightTime = `${momentFlightDuration.hours()}h ${momentFlightDuration.minutes()}m`
        return flightTime;

    }

    //function to convert the UTC format time to normal time for UI purposes, currently it is not calculating the local times will come to it later (seems a little complex to look at it now and waste time)
    const exactTimeFromUTC = (utcTime) => {

        const utcTimeData = moment.utc(utcTime);
        const formattedTime = utcTimeData.format('ddd, MMM D · h:mm A');
        return formattedTime;
    }

    //function to get the base64 string which will be converted to image of airline logo, based on IATA code
    const getAirlineLogo = async (iataCode) => {

        const airlineLogoUrl = `http://localhost:4000/api/testing/airlinelogo/${iataCode}`;
        const response = await fetch(airlineLogoUrl);
        const airlineLogoString = response.text();
        return airlineLogoString;
    }

    const newFlightData = new Flight({

        SessionId: sessionId,
        totalFlightPrice: flightsDataObject[chosenFlightDataObject].price.grandTotal,
        originCity: await getCityData(departureSegmentData[0].departure.iataCode),
        destinationCity: await getCityData(returnSegmentData[0].departure.iataCode),
        departingFlights: {
            flightNumber1: departureSegmentData[0].carrierCode + departureSegmentData[0].number,
            airline1: await getAirlineData(departureSegmentData[0].carrierCode),
            airline1Logo: await getAirlineLogo(departureSegmentData[0].carrierCode),
            airport1: await getAirportData(departureSegmentData[0].departure.iataCode),
            departureTime1: exactTimeFromUTC(departureSegmentData[0].departure.at),
            duration1: flightTime(departureSegmentData[0].duration),
            arrivalTime1: exactTimeFromUTC(departureSegmentData[0].arrival.at),
            layoverTime1: departureSegmentData[1] ? layoverCalc(departureSegmentData, 1) : null,
            flightNumber2: departureSegmentData[1] ? departureSegmentData[1].carrierCode + departureSegmentData[1].number : null,
            airline2: departureSegmentData[1] ? await getAirlineData(departureSegmentData[1].carrierCode) : null,
            airline2Logo: departureSegmentData[1] ? await getAirlineLogo(departureSegmentData[1].carrierCode) : null,
            airport2: departureSegmentData[1] ? await getAirportData(departureSegmentData[1].departure.iataCode) : null,
            departureTime2: departureSegmentData[1] ? exactTimeFromUTC(departureSegmentData[1].departure.at) : null,
            duration2: departureSegmentData[1] ? flightTime(departureSegmentData[1].duration) : null,
            arrivalTime2: departureSegmentData[1] ? exactTimeFromUTC(departureSegmentData[1].arrival.at) : null,
            layoverTime2: departureSegmentData[2] ? layoverCalc(departureSegmentData, 2) : null,
            flightNumber3:departureSegmentData[2] ? departureSegmentData[2].carrierCode + departureSegmentData[2].number : null,
            airline3: departureSegmentData[2] ? await getAirlineData(departureSegmentData[2].carrierCode) : null,
            airline3Logo: departureSegmentData[2] ? await getAirlineLogo(departureSegmentData[2].carrierCode) : null,
            airport3: departureSegmentData[2] ? await getAirportData(departureSegmentData[2].departure.iataCode) : null,
            departureTime3: departureSegmentData[2] ? exactTimeFromUTC(departureSegmentData[2].departure.at) : null,
            duration3: departureSegmentData[2] ? flightTime(departureSegmentData[2].duration) : null,
            arrivalTime3: departureSegmentData[2] ? exactTimeFromUTC(departureSegmentData[2].arrival.at) : null,
            destinationAirport: departureSegmentData[2] ? await getAirportData(departureSegmentData[2].arrival.iataCode) : departureSegmentData[1] ? await getAirportData(departureSegmentData[1].arrival.iataCode) : await getAirportData(departureSegmentData[0].arrival.iataCode),
            noOfStops: departureSegmentData[2] ? 2 : departureSegmentData[1] ? 1 : 0,
            totalFlightTime: departureSegmentData[2] ? flightTime(departureSegmentData[0].duration + departureSegmentData[1].duration + departureSegmentData[2].duration) : departureSegmentData[1] ? flightTime(departureSegmentData[0].duration + departureSegmentData[1].duration) : flightTime(departureSegmentData[0].duration),
            totalTime: flightTime(flightItinerariesData[0].duration),
        },
        returningFlights: {
            flightNumber1: returnSegmentData[0].carrierCode + returnSegmentData[0].number,
            airline1: await getAirlineData(returnSegmentData[0].carrierCode),
            airline1Logo: await getAirlineLogo(returnSegmentData[0].carrierCode),
            airport1: await getAirportData(returnSegmentData[0].departure.iataCode),
            departureTime1: exactTimeFromUTC(returnSegmentData[0].departure.at),
            duration1: flightTime(returnSegmentData[0].duration),
            arrivalTime1: exactTimeFromUTC(returnSegmentData[0].arrival.at),
            layoverTime1: returnSegmentData[1] ? layoverCalc(returnSegmentData, 1) : null,
            flightNumber2: returnSegmentData[1] ? returnSegmentData[1].carrierCode + returnSegmentData[1].number : null,
            airline2: returnSegmentData[1] ? await getAirlineData(returnSegmentData[1].carrierCode) : null,
            airline2Logo: returnSegmentData[1] ? await getAirlineLogo(returnSegmentData[1].carrierCode) : null,
            airport2: returnSegmentData[1] ? await getAirportData(returnSegmentData[1].departure.iataCode) : null,
            departureTime2: returnSegmentData[1] ? exactTimeFromUTC(returnSegmentData[1].departure.at) : null,
            duration2: returnSegmentData[1] ? flightTime(returnSegmentData[1].duration) : null,
            arrivalTime2: returnSegmentData[1] ? exactTimeFromUTC(returnSegmentData[1].arrival.at) : null,
            layoverTime2: returnSegmentData[2] ? layoverCalc(returnSegmentData, 2) : null,
            flightNumber3: returnSegmentData[2] ? returnSegmentData[2].carrierCode + returnSegmentData[2].number : null,
            airline3: returnSegmentData[2] ? await getAirlineData(returnSegmentData[2].carrierCode) : null,
            airline3Logo: returnSegmentData[2] ? await getAirlineLogo(returnSegmentData[2].carrierCode) : null,
            airport3: returnSegmentData[2] ? await getAirportData(returnSegmentData[2].departure.iataCode) : null,
            departureTime3: returnSegmentData[2] ? exactTimeFromUTC(returnSegmentData[2].departure.at) : null,
            duration3: returnSegmentData[2] ? flightTime(returnSegmentData[2].duration) : null,
            arrivalTime3: returnSegmentData[2] ? exactTimeFromUTC(returnSegmentData[2].arrival.at) : null,
            originAirport: returnSegmentData[2] ? await getAirportData(returnSegmentData[2].arrival.iataCode) : returnSegmentData[1] ? await getAirportData(returnSegmentData[1].arrival.iataCode) : await getAirportData(returnSegmentData[0].arrival.iataCode),
            noOfStops: returnSegmentData[2] ? 2 : returnSegmentData[1] ? 1 : 0,
            totalFlightTime: returnSegmentData[2] ? flightTime(returnSegmentData[0].duration + returnSegmentData[1].duration + returnSegmentData[2].duration) : returnSegmentData[1] ? flightTime(returnSegmentData[0].duration + returnSegmentData[1].duration) : flightTime(returnSegmentData[0].duration),
            totalTime: flightTime(flightItinerariesData[1].duration),
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
const storeAllTierFlightData = async (flightControllerData, sessionid) => {

    for(let i=0; i<noOfFlightData; i++){
       await FlightDataCreation(flightControllerData, i, sessionid);
    }
    
}

export default storeAllTierFlightData;



