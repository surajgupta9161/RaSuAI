import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    assistantName: {
        type: String
    },
    assistantImage: {
        type: String
    },
    assistantHistory: [
        { type: String }
    ]
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User