import mongoose from 'mongoose'
import accessories from "./Accessories.js";


const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        carBrand: {
            type: String,
            required: true,
        },
        carModel: {
            type: String,
            required: true,
        },
        carYear: {
            type: Number,
            required: true,
        },
        carMileage: {
            type: Number,
            required: true,
        },
        carImage: {
            type: String,
        },
        gas: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'gas'
            }
        ],
        spares: [

            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'spares'
            }

        ],
        accessories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'accessories'
            }
        ]
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('User', UserSchema)