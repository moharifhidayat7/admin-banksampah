import mongoose, { Schema } from "mongoose";
import Product from "./Product";

const MODEL_NAME = "ProductCategory";

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

schema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter());
  await Product.deleteMany({ _category: doc._id });
  next();
});

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema);
