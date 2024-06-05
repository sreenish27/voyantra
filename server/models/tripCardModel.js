import mongoose from 'mongoose';
import { Flight } from './flightModel';
import { Stay } from './stayModel';
import { RentalCar } from './rentalCarModel';
import { TripExpenseSplit } from './tripExpenseSplit';

const cardSchema = new mongoose.Schema(
    {
        budget:{type:Number, required: true},
        fromPlace:{type: String, required: true},
        toPlace:{type:String, required:true},
        noOfGuests:{type: String, required:true},
        flight: Flight,
        stay: Stay,
        tripExpenseSplit: TripExpenseSplit,
        rentalCar: RentalCar,       
    }
);

export const TripCard = mongoose.model('tripCard', cardSchema)