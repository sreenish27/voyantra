import mongoose from 'mongoose';

const staySchema = new mongoose.Schema({
    SessionId: {type: String},
    name: { type: String},
    checkInTime: { type: Date},
    checkOutTime: { type: Date},
    amenities: [String],
    numberOfBeds: { type: Number },
    bedType: { type: String },
    numberOfGuests: { type: Number},
    totalPrice: { type: Number},
    averageRatings: { type: Number},
    reviews: {type: String},
    image1: {type: Buffer},
    image2: {type: Buffer},
    image3: {type: Buffer},
    cancellationPolicy: {type: String},
    phone:{type: String},
    address:{type: String},
    googleMapLink:{type: String},
    websiteLink:{type: String},
    hotelLocationLat: {type: Number},
    hotelLocationLon: {type: Number},
    hotelIcon : {type: String}
    });

export const Stay = mongoose.model('stay', staySchema);