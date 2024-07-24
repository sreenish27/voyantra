import dotenv from 'dotenv';
import Amadeus from 'amadeus';
import { Client } from '@googlemaps/google-maps-services-js';

dotenv.config();

export const DB_CONNECTION = process.env.DB_URI;
export const flight_DB_CONNECTION = process.env.flight_DB_URI;
export const PORT = process.env.PORT;
export const Client_url = process.env.FRONTEND_URL;
export const Server_url = process.env.BACKEND_URL;

//Amadeus details
export const AMADEUS_USER_ID = process.env.AMADEUS_CLIENT_ID;
export const AMADEUS_SECRET_KEY = process.env.AMADEUS_CLIENT_SECRET;

//declaring the amadeus object to be used anywhere in the server side code to avoid repeated declaration across files
export const amadeusObj = new Amadeus ({
    clientId:AMADEUS_USER_ID,
    clientSecret:AMADEUS_SECRET_KEY,
    // hostname: "production",
});

//exporting the google api key
export const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_API_KEY;

//declaring the google APIs object to be used anywhere in the server side code and avoid repeated declaration across files
export const googlePlacesClient = new Client();
