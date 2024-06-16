import { amadeusObj } from "../config.js";


const FlightDataController = async (apireadyuserinput) => {

    let originIATA, destinationIATA;

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
        // const locationData = `https://geocode.maps.co/search?q=${x}&api_key=664e9777ab2b4679205092qzedd4b91`;
        const locationData = `https://us1.locationiq.com/v1/search?key=pk.1e349ff8a694e26ecd3a3e66e6a1504b&q=${x}&format=json`;

        try{
            const response = await fetch(locationData);
            const fullData = await response.json()
            // const latData = Number(fullData.lat);
            // const lonData = Number(fullData.lon);
            return fullData;

            // return {lonData, latData};
        } catch(err) {
            console.log(`Error in getting the latitude and longitude ${err}`);
        }
        
    }

    const getFinalLatLon = async (placeData) => {
        const finalLocationData = await getLatLon(placeData);
        const latData = Number(finalLocationData[0].lat);
        const lonData = Number(finalLocationData[0].lon);

        return{lonData, latData};
    }

    

    //retreive the nearest airports IATA codes for both from and to locations
    const getNearestAirportIATA = async (latitudeData, longitudeData) => {
        
        try {
            const response = await amadeusObj.referenceData.locations.airports.get({
                latitude:latitudeData,
                longitude:longitudeData
            });

            return response;
            
        } catch (err) {
            console.log(`Error while retrieving the IATA code of nearest airports for given location: ${err}`);
        }
    }

    //The Latitude and Longitudes of Origin Location
    try{
        const originGeoData = await getFinalLatLon(originLocation);
        const originLongitude = originGeoData.lonData;
        const originLatitude = originGeoData.latData;

        try{
            //Getting the IATA code for origin
            const nearestOriginAirport = await getNearestAirportIATA(originLatitude, originLongitude);
            originIATA = await nearestOriginAirport.data[0].iataCode;
        } catch(err){
            console.log(`Error in getting the origin IATA code: ${err}`)
        }
        

    } catch(err){
        console.log(`Error in getting the origin location coordinates: ${err}`)
    }
    

    //The Latitude and Longitudes of Destination Location
    try{
        const destinationGeoData = await getFinalLatLon(destinationLocation);
        const destinationLongitude = destinationGeoData.lonData;
        const destinationLatitude = destinationGeoData.latData;
        
        try{
            //Getting the IATA code for destination
            const nearestDestinationAirport = await getNearestAirportIATA(destinationLatitude, destinationLongitude);
            destinationIATA = await nearestDestinationAirport.data[0].iataCode;
        } catch(err){
            console.log(`Error in getting the destination IATA code: ${err}`)
        }

    } catch(err){
        console.log(`Error in getting the destination location coordinates: ${err}`)
    }
    

    const getFlightData = async () => {

        try {
            const response = await amadeusObj.shopping.flightOffersSearch.get({
                "originLocationCode":originIATA,
                "destinationLocationCode":destinationIATA,
                "departureDate":departingDate,
                "returnDate":returningDate,
                "adults":noOfAdults,
                "children":noOfChildren,
                "infants":noOfInfants,
                // "travelClass":classOfTravel,
                "currencyCode":purchaseCurrency,
                "max":maxResponses
            });
            return response;   
        } catch(err) {
            console.log(`Error in retreiving the flight prices data: ${err}`);

        }

    }

    const allFlightData =  getFlightData();

    return allFlightData;

}


export default FlightDataController;