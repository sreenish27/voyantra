import { Stay } from "../models/stayModel.js";
import { googlePlacesClient } from "../config.js";

const StayDataCreation = async (stayControllerData, k, sessionid) => {
    
        //getting just the data object as that is where all the info is
        const stayDataObject = stayControllerData.stayAllData.data;

        //getting the destination
        const destinationPlace = stayControllerData.destinationLocation;
    
        const chosenStayDataObject = k;

        //store the sessionid in this variable
        const sessionId = sessionid;

        const stayData = stayDataObject[chosenStayDataObject];

        //just to make the code cleaner and easy to maintain
        const stayDataOther = stayData?.offers?.[0];

        //now I will integrate google Places(new) API which has the details I want and 1 image (for now)

        const PlaceDetails = async (queryText) => {

            try{
                //first we get the place ID from the textsearch API
                const placeIDresponse = await googlePlacesClient.textSearch({
                    params:{
                        "query":queryText,
                        key:process.env.GOOGLE_API_KEY 
                    }                
                   })

                   
    
                    //next we get the place details from the placeID we got and also get the image ID from this
                    const placeID = placeIDresponse.data.results[0].place_id;
    
                    const placeDetailsResponse = await googlePlacesClient.placeDetails({
                        params:{
                            "place_id":placeID,
                            key: process.env.GOOGLE_API_KEY
                        }
                    });

                    const placeDetailsData = placeDetailsResponse.data.result;

                    //next I will use the placePhoto API to get the photos of the hotels (I will establish a function to get 3 photos)
                    const photoResponse = async (i) => {
                            const response = await googlePlacesClient.placePhoto({
                                params:{
                                    "photoreference": placeDetailsData.photos[i]?.photo_reference,
                                    "maxheight":800,
                                    "maxwidth":1000,
                                    key: process.env.GOOGLE_API_KEY
                                }
                            })
                            return response.data;
                    }
                    

                    const photo1 = await photoResponse(0);
                    const photo2 = await photoResponse(1);
                    const photo3 = await photoResponse(2);
    
                    //now store all the details you need from the previous API call in seperate and clear named variables
                    const hotelPhone = placeDetailsData.international_phone_number? placeDetailsData.international_phone_number : null;
                    const hotelAddress = placeDetailsData.formatted_address? placeDetailsData.formatted_address : null;
                    const hotelRating = placeDetailsData.rating? placeDetailsData.rating : null;
                    // const googleMapsAddressLink = placeDetailsData.placeDetailsResponse? placeDetailsResponse.placeDetailsResponse : null;
                    const hotelWebsite = placeDetailsData.website? placeDetailsData.website : null;
                    const hotelFullName = placeDetailsData.name? placeDetailsData.name:null;
                    //getting 3 images to display in the frontend
                    const hotelPhotoId1 = photo1? photo1 : null;
                    const hotelPhotoId2 = photo2? photo2 : null;
                    const hotelPhotoId3 = photo3? photo3 : null;

                    //get the latitude and longitude of the hotel
                    const hotelLat = placeDetailsData.geometry?.location?.lat? placeDetailsData.geometry.location.lat : 0;
                    const hotelLon = placeDetailsData.geometry?.location?.lng? placeDetailsData.geometry.location.lng : 0;

                    //getting the hotel icon
                    const hotelIcon = placeDetailsData.icon? placeDetailsData.icon : null;

                    //returning everything I need
                    return{
                        hotelPhone,
                        hotelAddress,
                        hotelRating,
                        hotelWebsite,
                        hotelFullName,
                        hotelPhotoId1,
                        hotelPhotoId2,
                        hotelPhotoId3,
                        hotelLat,
                        hotelLon,
                        hotelIcon
                    }
    
                    //now we store the details we want in seperate variables
                } catch(err){
                    console.log(`Error in trying to get data from google apis: ${err}`);
                }

            }  
            
        const allPlaceDetails = await PlaceDetails(`${stayData.hotel.name} in ${destinationPlace}`);

        const newStayData = new Stay({
            SessionId: sessionId,
            name: stayData?.hotel?.name,
            checkInTime: stayDataOther?.checkInDate,
            checkOutTime: stayDataOther?.checkOutDate,
            amenities: stayDataOther?.room.description.text,
            numberOfBeds:stayDataOther?.room?.typeEstimated?.beds ?? 1,
            bedType: stayDataOther?.room?.typeEstimated?.bedType ?? "King",
            numberOfGuests: stayDataOther?.guests?.adults,
            totalPrice: stayDataOther?.price?.total,
            averageRatings: allPlaceDetails.hotelRating,
            image1: allPlaceDetails.hotelPhotoId1,
            image2: allPlaceDetails.hotelPhotoId2,
            image3: allPlaceDetails.hotelPhotoId3,
            phone: allPlaceDetails.hotelPhone,
            address: allPlaceDetails.hotelAddress,
            googleMapLink: allPlaceDetails.googleMapsAddressLink,
            websiteLink: allPlaceDetails.hotelWebsite,
            hotelLocationLat: allPlaceDetails.hotelLat,
            hotelLocationLon: allPlaceDetails.hotelLon,
            hotelIcon: allPlaceDetails.hotelIcon
        })

        //save the data in MongoDB (an addition here is that if the name of the hotel is not there do not save it)

            try{
                newStayData.save();
            } catch(err){
                console.log(`Error in trying to save the new stay data: ${err}`);
            } 
        
}        

//the below is to store 5 stay objects in MongoDB
const storeAllTierStayData = async (stayControllerData, sessionid) => {

    let lenOfStayData = stayControllerData.stayAllData.data.length > 5 
                        ? 5 : stayControllerData.stayAllData.data.length;

    for(let i=0; i<lenOfStayData; i++){
       await StayDataCreation(stayControllerData, i, sessionid);
    }
    
}

export default storeAllTierStayData;
