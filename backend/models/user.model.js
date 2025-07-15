import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 6,
    },
    summary: {
        type: String,
        trim: true,
        maxLength: 1000
    },
    role: {
        type: String,
        enum: ["admin", "employee"],
        default: "employee",
    },
    phone: {
        type: String,
        required: [true, 'Phone is required']
    },
    location: {
        type: String,
        required: [true, 'location is required']
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema)

export default User;

// "email": "ali@example.com",
//   "password": "password",