import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema(
    {
        SessionId: String,
        flight: mongoose.Schema.Types.Mixed,
        stay: mongoose.Schema.Types.Mixed,
        noOfTripCards: Number
    }
);

export const TripCard = mongoose.model('tripCard', cardSchema)