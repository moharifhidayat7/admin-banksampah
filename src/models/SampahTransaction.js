import mongoose, { Schema } from "mongoose";

import { SampahTypeSchema } from "./SampahType";
import "./NasabahProfile";
import "./BankTransaction";
import "./SampahStock";
import "./SampahType";

const MODEL_NAME = "SampahPurchase";

const itemSchema = new Schema(
  {
    _sampahType: {
      type: SampahTypeSchema,
      required: true,
    },
    price: {
      type: Number,
      min: 1,
      default: this._sampahType.price,
    },
    qty: {
      type: Number,
      min: 1,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

itemSchema.virtual("subTotal").get(() => this.price * this.qty);

const schema = new Schema(
  {
    _nasabah: {
      type: Schema.Types.ObjectId,
      ref: "NasabahProfile",
      autopopulate: true,
      required: () => (this.transactionType === "TABUNG" ? true : false),
    },
    transactionType: {
      type: String,
      enum: ["TABUNG", "CASH", "PENJUALAN"],
      required: true,
    },
    transactionDate: {
      type: Date,
      default: new Date(),
    },
    customer: String,
    note: String,
    items: [{ type: itemSchema }],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

schema
  .virtual("total")
  .get(() => this.items.reduce((total, cur) => total + items.subTotal, 0));

schema.virtual("transactionId").get(() => {
  const date = new Date(this.createdAt);
  const year = date.getFullYear().toString().slice(2).padStart(4, 0);
  const month = date.getMonth().toString().padStart(2, 0);
  const day = date.getDate().toString().padStart(2, 0);

  return "BSB" + year + month + day + transactionNo.toString().padStart(3, 0);
});

// schema.post("save", async function (doc) {
//   if (doc._nasabah && doc.transactionType == "TABUNG") {
//     await mongoose.model("BankTransaction").create({
//       transactionType: "DEBIT",
//       amount: doc.total,
//       _sampahTransaction: doc._id,
//       _nasabah: doc._nasabah,
//     });
//   }
//   for (let i = 0; i < doc.items.length; i++) {
//     const item = doc.items[i];

//     await mongoose.model("SampahStock").create({
//       _sampahType: item._sampahType._id,
//       qty: item.qty,
//       note: "Pembelian",
//       stockType: "IN",
//     });
//   }
// });

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(
    MODEL_NAME,
    schema.plugin(require("mongoose-sequence")(mongoose), {
      inc_field: "transactionNo",
    })
  );
