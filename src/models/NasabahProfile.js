import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "NasabahProfile";

const schema = new Schema(
    {
        rekening: {
            type: String,
            unique: true,
            required: true,
            default: function () {
                return Math.floor(1000000 + Math.random() * 9000000);
            },
        },
        nik: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        address: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        birthdate: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["Laki-Laki", "Perempuan"],
            required: true,
        },
        accountType: {
            type: String,
            enum: ["Umum", "Kelompok"],
            required: true,
        },
        ktp: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.models[MODEL_NAME] ||
    mongoose.model(MODEL_NAME, schema);
