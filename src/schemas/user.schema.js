import { Schema, model } from "mongoose";
import { Genders, Roles } from "../enums/const-roles.js";

const userSchema = new Schema({
    fullname: { type: String },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    hashedPassword: { type: String, required: true },
    address: { type: String },
    image: { type: String },
    isActive: { type: Boolean, default: true },
    gender: { type: String, enum: [Genders.MALE, Genders.FEMALE] },
    role: {
        type: String, enum: [
            Roles.SUPERADMIN,
            Roles.ADMIN,
            Roles.SELLER,
            Roles.CUSTOMER
        ], required: true
    }
}, {
    versionKey: false,
    timestamps: true
})

export default model('User', userSchema)