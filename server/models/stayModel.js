import mongoose from 'mongoose';

const staySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    checkInTime: { type: Date, required: true },
    checkOutTime: { type: Date, required: true },
    amenities: [String],
    numberOfBeds: { type: Number, required: true },
    numberOfBaths: { type: Number, required: true },
    numberOfGuests: { type: Number, required: true },
    numberOfInfants: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    averageRatings: { type: Number, required: true },
    reviews: [String],
    images: [String],
    cancellationPolicy: { type: String, required: true },
  });

export const Stay = mongoose.model('stay', staySchema);