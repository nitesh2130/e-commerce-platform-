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
            type: String,                           // cloudinary Url
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

//this is for hashed to the password
userSchema.pre("save", async function(next) {
    //if password is not modified, it pass to the next
    if(!this.isModified(this.password)) return next();

    // if password is modified, it do hash
    this.password = await bcrypt.hash(this.password, 10)
})


// this is compare the password, password is correct or not
userSchema.method.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

// This is generate Access Token
userSchema.method.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            phoneNumber: this.phoneNumber,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// This is generate Refresh Token
userSchema.method.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema)