import dotenv from 'dotenv';
import amadeus from 'amadeus';

dotenv.config();

export const DB_CONNECTION = process.env.DB_URI;
export const PORT = process.env.PORT;

//Amadeus details
export const AMADEUS_USER_ID = process.env.AMADEUS_CLIENT_ID;
export const AMADEUS_SECRET_KEY = process.env.AMADEUS_CLIENT_SECRET;

//declare the global user input variable here to handle intialization problems
// export let globaluserinput;

//declaring the amadeus object to be used anywhere in the server side code to avoid repeated declaration across files
export const amadeusObj = new amadeus ({
    clientId:`${AMADEUS_USER_ID}`,
    clientSecret:`${AMADEUS_SECRET_KEY}`
});
