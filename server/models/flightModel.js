import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema(
    {
        DepartingFlights: {
            flightNumber1: String,
            airline1: String,
            airport1: String,
            departureTime1: Date,
            arrivalTime2: Date,
            duration1: String,
            layoverTime2: String,
            flightNumber2: String,
            airline2: String,
            airport2: String,
            departureTime2: Date,
            layoverTime3: String,
            flightNumber3: String,
            airline3: String,
            airport3: String,
            arrivalTime3: Date,
            duration2: String,
            fullPrice: Number,
            totalTripTime: String,
            seatClass: String,
          },
          returning: {
            flightNumber1: String,
            airline1: String,
            airport1: String,
            departureTime1: Date,
            arrivalTime2: Date,
            duration1: String,
            layoverTime2: String,
            flightNumber2: String,
            airline2: String,
            airport2: String,
            departureTime2: Date,
            layoverTime3: String,
            flightNumber3: String,
            airline3: String,
            airport3: String,
            arrivalTime3: Date,
            duration2: String,
            fullPrice: Number,
            totalTripTime: String,
            seatClass: String,
          },
          totalPrice: Number,
          totalTimeSpent: String,
    }
    );

export const Flight = mongoose.model('flight', flightSchema);