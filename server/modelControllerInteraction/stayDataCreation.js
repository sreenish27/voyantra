import { Stay } from "../models/stayModel.js";

const StayDataCreation = async (stayControllerData, k, sessionid) => {
    
        //getting just the data object as that is where all the info is
        const stayDataObject = stayControllerData.data;
    
        const chosenStayDataObject = k;

        //store the sessionid in this variable
         const sessionId = sessionid;

        const stayData = stayDataObject[chosenStayDataObject];

        //just to make the code cleaner and easy to maintain
        const stayDataOther = stayData?.offers?.[0];

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
            //cancellationPolicy: stayDataOther.policies?.cancellations[0]?.deadline ?? "not given",
        })

        //save the data in MongoDB
        try{
            newStayData.save();
        } catch(err){
            console.log(`Error in trying to save the new stay data: ${err}`);
        }  

}        
    
      

//To give variety in the kind of hotels
const noOfStayData = 5;

//the below is to store 4 flight objects in MongoDB
const storeAllTierStaytData = async (stayControllerData, sessionid) => {

    for(let i=0; i<noOfStayData; i++){
       await StayDataCreation(stayControllerData, i, sessionid);
    }
    
}

export default storeAllTierStaytData;