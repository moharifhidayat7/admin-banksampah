import mongoose, { Schema } from "mongoose";
import "./SampahCategory";

const MODEL_NAME = "SampahType";

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        _category: {
            type: Schema.Types.ObjectId,
            ref: "SampahCategory",
            autopopulate: true,
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
