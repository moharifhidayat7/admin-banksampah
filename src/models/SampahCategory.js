import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "SampahCategory";

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

export default mongoose.models[MODEL_NAME] ||
    mongoose.model(MODEL_NAME, schema);
