import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema(
    {
        flight: mongoose.Schema.Types.Mixed,
        stay: mongoose.Schema.Types.Mixed,    
    }
);

export const TripCard = mongoose.model('tripCard', cardSchema)