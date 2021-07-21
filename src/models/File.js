import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "File";

const schema = new Schema(
  {
    file: {
      type: Buffer,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema);
