import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "SampahType";

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: [
                "Kertasan",
                "Emberan",
                "Botol",
                "Logam/Besi",
                "Kresek/Plastik",
                "Lain - Lain",
            ],
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        denom: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
    mongoose.model(MODEL_NAME, schema);
