import mongoose, { Schema } from "mongoose";
import "./NasabahProfile";

const MODEL_NAME = "NasabahAccount";

const schema = new Schema(
    {
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
            autopopulate: true,
        },
    },
    { timestamps: true }
);

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
    mongoose.model(MODEL_NAME, schema);
