import mongoose, { Schema } from "mongoose";
import "./ProductCategory";

const MODEL_NAME = "Product";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    _picture: {
      type: Schema.Types.ObjectId,
      ref: "File",
    },
    _category: {
      type: Schema.Types.ObjectId,
      ref: "ProductCategory",
      autopopulate: true,
    },
    description: {
      type: String,
    },
    stock: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Offline", "Online"],
    },
  },
  { timestamps: true }
);

schema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter());

  await mongoose.model("ProductStock").deleteMany({ _product: doc._id });

  next();
});

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema);

export { schema as ProductSchema };
