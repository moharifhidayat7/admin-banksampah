import mongoose, { Schema } from "mongoose";
import { SampahTypeSchema } from "./SampahType";
import "./SampahStock";

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

schema.post("save", async function (doc) {
  if (doc.transactionType == "TABUNG") {
    await mongoose.model("BankTransaction").create({
      transactionType: "DEBIT",
      amount: doc.total,
      _sampahTransaction: doc._id,
      _nasabah: doc._nasabah,
    });
  }
  for (let i = 0; i < doc.items.length; i++) {
    const item = doc.items[i];
    await mongoose.model("SampahStock").create({
      _sampahType: item._sampahType._id,
      qty: item.qty,
      note: "Penjualan",
      stockType: "OUT",
    });
  }
});

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema);
