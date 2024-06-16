import mongoose from 'mongoose';

const staySchema = new mongoose.Schema({
    name: { type: String},
    checkInTime: { type: Date},
    checkOutTime: { type: Date},
    amenities: [String],
    numberOfBeds: { type: Number },
    bedType: {type:String},
    numberOfGuests: { type: Number},
    totalPrice: { type: Number},
    averageRatings: { type: Number},
    reviews: [String],
    images: [String],
    cancellationPolicy: { type: String},
  });

export const Stay = mongoose.model('stay', staySchema);