import mongoose from 'mongoose'

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
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('User', UserSchema)