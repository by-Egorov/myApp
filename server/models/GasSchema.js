import mongoose from 'mongoose';

const GasSchema = new mongoose.Schema({
    date: { type: Number },
    price: { type: Number }
});

export default GasSchema;
