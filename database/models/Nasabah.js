import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NasabahCredentialSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    _profile: {
        type: Schema.Types.ObjectId,
        ref: "NasabahProfile",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const NasabahProfileSchema = new Schema({
    nik: {
        type: String,
        required: true,
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
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
    },
    accountType: {
        type: String,
        enum: ["personal", "corporate", "business"],
        required: true,
    },
    rekening: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

mongoose.models = {};

const NasabahCredential =
    mongoose.models.NasabahCredential ||
    mongoose.model("NasabahCredential", NasabahCredentialSchema);
const NasabahProfile =
    mongoose.models.NasabahProfile ||
    mongoose.model("NasabahProfile", NasabahProfileSchema);

export { NasabahCredential, NasabahProfile };
