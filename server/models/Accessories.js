import mongoose from 'mongoose';

const AccessoriesSchema = new mongoose.Schema({
    title: { type: String },
    price: { type: Number }
});

export default AccessoriesSchema;
