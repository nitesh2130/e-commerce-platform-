import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
            unique: true,
        },
        profileImage: {
            type: true,                           // cloudinary Url
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {                          // refresh token it's expiry is too long,
            type: String
        }

    },
    {
        timestamps: true
    }
)

export const User = mongoose.model('User', userSchema)