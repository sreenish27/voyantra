import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema(
    {
        totalFlightPrice:String,
        originCity: String,
        destinationCity: String,
        departingFlights: {
            flightNumber1: String,
            airline1: String,
            airline1Logo:String,
            airport1: String,
            departureTime1: String,
            duration1: String,
            arrivalTime1: String,
            layoverTime1: String,
            flightNumber2: String,
            airline2: String,
            airline2Logo:String,
            airport2: String,
            departureTime2: String,
            duration2: String,
            arrivalTime2: String,
            layoverTime2: String,
            flightNumber3: String,
            airline3: String,
            airline3Logo: String,
            airport3: String,
            departureTime3: String,
            duration3: String,
            arrivalTime3: String,
            destinationAirport: String,
            noOfStops: Number,
            totalTime: String,
            totalFlightTime: String,
          },
          returningFlights: {
            flightNumber1: String,
            airline1: String,
            airline1Logo:String,
            airport1: String,
            departureTime1: String,
            duration1: String,
            arrivalTime1: String,
            layoverTime1: String,
            flightNumber2: String,
            airline2: String,
            airline2Logo:String,
            airport2: String,
            departureTime2: String,
            duration2: String,
            arrivalTime2: String,
            layoverTime2: String,
            flightNumber3: String,
            airline3: String,
            airline3Logo:String,
            airport3: String,
            departureTime3: String,
            duration3: String,
            arrivalTime3: String,
            originAirport: String,
            noOfStops: Number,
            totalTime: String,
            totalFlightTime: String,
          },
    }
    );

export const Flight = mongoose.model('flight', flightSchema);