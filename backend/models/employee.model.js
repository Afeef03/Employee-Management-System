import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 20,
    },
    lastName: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 20,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please fill a valid email address"]
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        match: [/^\d{10}$/, "Please enter a valid 12-digit phone number"],
    },
    dateOfJoining: {
        type: Date,
        required: true,
    },
    currentCTC: {
        type: Number,
        required: true,
        min: [0, "CTC cannot be negative"],
    },
    designation: {
        type: String,
        required: [true, "Designation is required"]
    },
    department: {
        type: String,
        required: true,
        enum: ["HR", "Marketing", "Sales", "Information Technology"],
    },
    status: {
        type: String,
        required: true,
        enum: ["Active", "Inactive", "OnLeave", "Left"],
    },
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;