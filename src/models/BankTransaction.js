import mongoose, { Schema } from "mongoose";
import "./SampahTransaction";
import "./NasabahProfile";

const MODEL_NAME = "BankTransaction";

const schema = new Schema(
  {
    _nasabah: {
      type: Schema.Types.ObjectId,
      ref: "NasabahProfile",
      autopopulate: true,
      required: true,
    },
    _sampahTransaction: {
      type: Schema.Types.ObjectId,
      ref: "SampahTransaction",
    },
    transactionType: {
      type: String,
      enum: ["DEBIT", "KREDIT"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS"],
      default: "PENDING",
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema);
