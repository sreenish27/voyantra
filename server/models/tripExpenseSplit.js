import mongoose from 'mongoose';

const tripExpenseSplitSchema = mongoose.Schema(
    {
        flightSplit:{type: Number, required:true},
        staySplit:{type: Number, required:true},
        rentalCarSplit:{type:Number, required:true},
    }
);

export const TripExpenseSplit = mongoose.model('tripExpenseSplit', tripExpenseSplitSchema);