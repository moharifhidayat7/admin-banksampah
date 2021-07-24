import mongoose, { Schema } from "mongoose";
import SampahType from "./SampahType";

const MODEL_NAME = "SampahCategory";

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

schema.pre("findOneAndDelete", async function () {
  await SampahType.deleteMany({ _category: this._id });
});

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema);
