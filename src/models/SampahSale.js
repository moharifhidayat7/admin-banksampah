import mongoose, { Schema } from "mongoose";
import { SampahTypeSchema } from "./SampahType";

const MODEL_NAME = "SampahSale";

const schema = new Schema(
  {
    note: {
      type: String,
    },
    customer: {
      type: String,
    },
    transactionDate: {
      type: Date,
      default: new Date(),
    },
    items: [
      {
        _sampahType: {
          type: SampahTypeSchema,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        buyerPrice: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema);
