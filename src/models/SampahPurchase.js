import mongoose, { Schema } from "mongoose";
import "./NasabahProfile";

const MODEL_NAME = "SampahPurchase";

const schema = new Schema(
  {
    transactionType: {
      type: String,
      enum: ["TABUNG", "CASH"],
      required: true,
    },
    transactionDate: {
      type: Date,
      default: new Date(),
      required: true,
    },
    _nasabah: {
      type: Schema.Types.ObjectId,
      ref: "NasabahProfile",
      autopopulate: true,
      required: function () {
        if (this.transactionType == "TABUNG" && !this.customer) {
          return true;
        }
        return false;
      },
    },
    customer: {
      name: {
        type: String,
      },
      address: {
        type: String,
      },
      mobile: {
        type: String,
      },
    },
    note: {
      type: String,
    },
    items: [
      {
        _id: {
          type: String,
          required: true,
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
