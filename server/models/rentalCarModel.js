import mongoose from 'mongoose';

const rentalCarSchema = new mongoose.Schema({
    type: { type: String, required: true },
    company: { type: String, required: true },
    price: { type: Number, required: true },
    pickupLocation: { type: String, required: true },
    dropLocation: { type: String, required: true },
    pickupDateTime: { type: Date, required: true },
    dropDateTime: { type: Date, required: true },
    insuranceOptions: [String],
    fuelPolicy: { type: String, required: true },
    mileageLimit: { type: Number, required: true },
    additionalFeatures: [String],
  });

export const RentalCar = mongoose.model('rentalCar', rentalCarSchema);