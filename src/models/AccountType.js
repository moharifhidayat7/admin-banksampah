import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "AccountType";

const schema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  counter: {
    type: Number,
    immutable: true,
    default: 0,
  },
});

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema);
