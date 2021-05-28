import mongoose, { Schema } from "mongoose";
import "./SampahPurchase";
import "./NasabahProfile";

const MODEL_NAME = "BankTransaction";

const schema = new Schema(
    {
        note: {
            type: String,
        },
        transactionType: {
            type: String,
            enum: ["Pemasukan", "Penarikan"],
            required: true,
        },
        _sampahTransaction: {
            type: Schema.Types.ObjectId,
            ref: "SampahPurchase",
            autopopulate: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        _nasabah: {
            type: Schema.Types.ObjectId,
            ref: "NasabahProfile",
            required: true,
            autopopulate: true,
        },
    },
    { timestamps: true }
);

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
    mongoose.model(MODEL_NAME, schema);
