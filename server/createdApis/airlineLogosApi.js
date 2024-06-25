import { flight_db } from "./airlineApi.js";

//get airline logo from the IATA code of the airline
const fetchAirlineLogo = async (iataCode) => {

    try{
        const airlineLogoCollection = flight_db.collection('airlineLogos');

        //converting the IATA code to 'IATACode.png' format as that is the name in the airlineLogos database
        const IATAcodeIdentifier = iataCode + '.png';

        const airlineLogo = await airlineLogoCollection.findOne({'name':`${IATAcodeIdentifier}`});

        const imageBase64Code = airlineLogo.base64;

        return imageBase64Code;
    } catch(err){
        console.log(`Error in getting the image data of airlines from MongoDB: ${err}`);
        throw err;
    }
}

export default fetchAirlineLogo;