import mongoose from 'mongoose';

const SparesSchema = new mongoose.Schema({
    mileage: { type: Number },
    title: { type: String },
    price: { type: Number }
});

export default SparesSchema;
