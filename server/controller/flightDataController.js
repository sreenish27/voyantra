import { amadeusObj } from "../config.js";
import { getApiReadyUserInput } from "../apiReadyUserInputStore.js";

const apireadyuserinput = getApiReadyUserInput();

const FlightDataController = async () => {

    const maxResponses = 10;
    const purchaseCurrency = 'USD';
    const classOfTravel = 'ECONOMY';

    //Get all the input data and store it in proper variables
    const departingDate = apireadyuserinput.departDate;
    const returningDate = apireadyuserinput.returnDate;
    const noOfAdults = apireadyuserinput.noOfAdultsandChildren;
    const noOfChildren = 0;
    const noOfInfants = apireadyuserinput.noOfInfants;

    //Getting the from and to locations for further processing
    const originLocation = apireadyuserinput.fromLocation;
    const destinationLocation = apireadyuserinput.toLocation;



    const getLatLon = async (x) => {

        //we will process the from and to locations to get the IATA code to be passed to our API calls
        const locationData = `https://geocode.maps.co/search?q=${x}&api_key=664e9777ab2b4679205092qzedd4b91`;

        try{
            const response = await fetch(locationData);
            const fullData = await response.json()
            const latData = fullData.lat;
            const lonData = fullData.lon;

            return {lonData, latData};
        } catch(err) {
            console.log(`Error in getting the latitude and longitude ${err}`);
        }
        
    }

    //The Latitude and Longitudes of Origin Location
    const originGeoData = await getLatLon(originLocation);
    const originLongitude = originGeoData.lonData;
    const originLatitude = originGeoData.latData;

    //The Latitude and Longitudes of Destination Location
    const destinationGeoData = await getLatLon(destinationLocation);
    const destinationLongitude = destinationGeoData.lonData;
    const destinationLatitude = destinationGeoData.latData;

    //retreive the nearest airports IATA codes for both from and to locations
    const getNearestAirportIATA = async (latitudeData, longitudeData) => {
        
        try {
            const response = await amadeusObj.referenceData.locations.airports.get({
                latitude:latitudeData,
                longitude:longitudeData
            })
            return response[0].iatacode;
        } catch (err) {
            console.log(`Error while retrieving the IATA code of nearest airports for given location: ${err}`);
        }
    }

    //Getting the IATA code for origin and destination
    const originIATA = await getNearestAirportIATA(originLatitude, originLongitude);
    const destinationIATA = await getNearestAirportIATA(destinationLatitude, destinationLongitude);

    const getAllFlightData = async () => {

        try {
            const response = amadeusObj.shopping.flightOffersSearch.get({
                originLocationCode:`${originIATA}`,
                destinationLocationCode:`${destinationIATA}`,
                departureDate:`${departingDate}`,
                returnDate:`${returningDate}`,
                adults:`${noOfAdults}`,
                children:`${noOfChildren}`,
                infants:`${noOfInfants}`,
                travelClass:`${classOfTravel}`,
                currencyCode:`${purchaseCurrency}`,
                max:maxResponses
            })
            return response;
        } catch(err) {
            console.log(`Error in retreiving the flight prices data: ${err}`);
        }

    }

    return getAllFlightData();

}


export default FlightDataController;