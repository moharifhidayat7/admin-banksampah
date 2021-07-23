import mongoose, { Schema, SchemaTypes } from "mongoose";

import { SampahTypeSchema } from "./SampahType";
import "./NasabahProfile";
import "./BankTransaction";
import "./SampahStock";

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
    },
    _nasabah: {
      type: Schema.Types.ObjectId,
      ref: "NasabahProfile",
      autopopulate: true,
      required: function () {
        if (this.transactionType == "TABUNG") {
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
    items: [
      {
        _sampahType: { type: SampahTypeSchema, required: true },
        qty: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true } }
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
      note: "Pembelian",
      stockType: "IN",
    });
  }
});

schema.virtual("total").get(function () {
  const total = this.items.reduce((acc, cur) => {
    const subTotal = cur._sampahType.price * cur.qty;
    return acc + subTotal;
  }, 0);
  return total;
});

schema.virtual("invoice_id").get(function () {
  return "BSB" + this.transactionNo.toString().padStart(6, 0);
});

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(
    MODEL_NAME,
    schema.plugin(require("mongoose-sequence")(mongoose), {
      inc_field: "transactionNo",
    })
  );
