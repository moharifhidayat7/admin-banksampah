import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Transfer";

const schema = new Schema(
    {
        note: {
            type: String,
        },
        to: {
            type: String,
            enum: ["Gudang", "Rumah Kreatif", "Kompos"],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
    mongoose.model(MODEL_NAME, schema);
