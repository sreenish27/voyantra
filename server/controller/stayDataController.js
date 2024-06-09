import { amadeusObj } from "../config.js";

//here I have created a controller function that will take both hotel API and hotel offers API to return what we want correctly - then we will thinkn on how to process it
const StayDataController = async (apireadyuserinput) => {

    const radius = 20;
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
    // const setLocationData = (location) => {
    //     const finalLocationData = location;
    //     return finalLocationData;
    // }

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
                "longitude":lon
            })
            return response;   
        } catch(err) {
            console.log(`Error in retreiving the flight prices data: ${err}`);

        }

    }

    //storing the stay codes in appropirate variables, need to store a list of them - atleast 6(for 6 cards)
    const destinationStayCodes = await getStayCode(destinationLatitude, destinationLongitude);

    //create a dictionary to store all hotelIds and distances - this is being done because I cannot process the next API that returns prices for all of them, so I am using random sampling with distance bias to pick 10 out of all
    const stayIdandDist = {};

    for(let i=0; i<destinationStayCodes.data.length; i++ ) {
        const hotelIdKey = destinationStayCodes.data[i].hotelId;
        const hotelIdValue = destinationStayCodes.data[i].distance.value;
        stayIdandDist[hotelIdKey] = hotelIdValue;
    }

    
    
    //Selection of 10 HotelIds from the above dictionary
    const tenStayIdDict = {};
    //converting the stayIdandDist into an array of key:value pairs
    const stayIdandDistArray = Object.entries(stayIdandDist);
    const lengthOfStayIdArray = stayIdandDistArray.length;

    for(let i=1; i<=10; i++){
        const rem = lengthOfStayIdArray % 10;
        const divisibleLength = lengthOfStayIdArray - rem;
        const keyValuePair = stayIdandDistArray[(divisibleLength/10)*i];
        tenStayIdDict[keyValuePair[0]] = keyValuePair[1];
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
    const stayIdKeys = Object.keys(tenStayIdDict);
    
    const stayAllData = await getStayFullData(stayIdKeys);


    return stayAllData; 

}


export default StayDataController;