import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "SampahSale";

const schema = new Schema(
  {
    note: {
      type: String,
    },
    customer: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    mobile: {
      type: String,
    },
    transactionDate: {
      type: Date,
      default: new Date(),
      required: true,
    },
    items: [
      {
        _id: {
          type: String,
        },
        _category: {
          _id: {
            type: String,
          },
          name: {
            type: String,
            required: true,
          },
        },
        price: {
          type: Number,
          required: true,
        },
        buyerPrice: {
          type: Number,
        },
        name: {
          type: String,
          required: true,
        },
        denom: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema);
