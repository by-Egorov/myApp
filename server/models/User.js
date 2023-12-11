import mongoose from 'mongoose'
import GasSchema from "./GasSchema.js"
import SparesSchema from "./SparesSchema.js"
import AccessoriesSchema from "./Accessories.js"

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
        gas: [GasSchema],
        spares: [SparesSchema],
        accessories: [AccessoriesSchema]
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('User', UserSchema)