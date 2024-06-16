import { amadeusObj } from "../config.js";

//here I have created a controller function that will take both hotel API and hotel offers API to return what we want correctly - then we will thinkn on how to process it
const StayDataController = async (apireadyuserinput) => {

    const radiusValue = 7;

    const radius = Math.floor(radiusValue);
    //Getting the from and to locations for further processing
    const destinationLocation = apireadyuserinput.toLocation;

    //Getting the number of guests
    const noOfGuests = apireadyuserinput.noOfAdultsandChildren;

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

    // //a function to store the location data and then access it from here so that I can avoid any issues with the async await structure of data retreival from API calls

    const getFinalLatLon = async (placeData) => {
        const finalLocationData = await getLatLon(placeData);
        const latData = Number(finalLocationData[0].lat);
        const lonData = Number(finalLocationData[0].lon);

        return{lonData, latData};
    }

    //The Latitude and Longitudes of Destination Location

    let destinationLongitude, destinationLatitude;
    try{
        const destinationGeoData = await getFinalLatLon(destinationLocation);
        destinationLongitude = destinationGeoData.lonData;
        destinationLatitude = destinationGeoData.latData;

    } catch(err){
        console.log(`Error in getting the destination location coordinates: ${err}`)
    }

    // console.log(destinationLatitude, destinationLongitude);
    
    //First we get the hotel codes from the geo coding data
    const getStayCode = async (lat, lon) => {

        try {
            const response = await amadeusObj.referenceData.locations.hotels.byGeocode.get({
                "latitude":lat,
                "longitude":lon,
                "radius":radius,
            })
            return response;   
        } catch(err) {
            console.log(`Error in retreiving the hotel Id data: ${err}`);

        }

    }

    //storing the stay codes in appropirate variables, need to store a list of them - atleast 6(for 6 cards)
    const destinationStayCodes = await getStayCode(destinationLatitude, destinationLongitude);

    let hotelIdArray = [];

    for(let i=0; i<destinationStayCodes.data.length; i++ ) {
        const hotelIdKey = destinationStayCodes.data[i].hotelId; 
        hotelIdArray.push(hotelIdKey);
    } 

    //function to get the prices data
    const getStayFullData = async (hotelid) => {
        try{

            const response = await amadeusObj.shopping.hotelOffersSearch.get({
                "hotelIds":hotelid.join(','),
                "adults":noOfGuests
            })

            return response;
        } catch(err){
            console.log('Error in retrieving the prices data from the hotelIds');
        }
    }
    //get just the hotelIds
    // const stayIdKeys = Object.keys(tenStayIdDict);
    
    const stayAllData = await getStayFullData(hotelIdArray);


    return stayAllData; 

}


export default StayDataController;