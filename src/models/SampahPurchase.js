import mongoose, { Schema } from "mongoose";
import { SampahTypeSchema } from "./SampahType";
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
      type: String,
    },
    note: {
      type: String,
    },
    items: [SampahTypeSchema],
  },
  { timestamps: true }
);

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema);
