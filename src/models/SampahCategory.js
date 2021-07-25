import mongoose, { Schema } from "mongoose";
import SampahType from "./SampahType";

const MODEL_NAME = "SampahCategory";

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

schema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter());
  await SampahType.deleteMany({ _category: doc._id });
  next();
});

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema);
