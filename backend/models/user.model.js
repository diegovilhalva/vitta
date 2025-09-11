import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/
    },
    password: { type: String }, 
    mobile: { type: String, default: null },
    role: { type: String, enum: ["user", "owner", "deliveryBoy"], default: "" },
    provider: { type: String, enum: ["local", "google"], default: "local" },
    isProfileComplete: { type: Boolean, default: false },

   
    resetOtp: { type: String },
    isOtpVerified: { type: Boolean, default: false },
    otpExpires: { type: Date },
}, { timestamps: true })


const User = mongoose.model("User", userSchema)

export default User

