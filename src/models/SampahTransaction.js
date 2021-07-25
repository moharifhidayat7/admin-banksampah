import mongoose, { Schema } from "mongoose";
import { SampahTypeSchema } from "./SampahType";
import "./NasabahProfile";
import "./BankTransaction";
import "./SampahStock";

const MODEL_NAME = "SampahTransaction";

const itemSchema = new Schema(
  {
    _sampahType: {
      type: SampahTypeSchema,
      required: true,
    },
    price: {
      type: Number,
      min: 1,
      default: function () {
        return this._sampahType.price;
      },
    },
    qty: {
      type: Number,
      min: 1,
      required: true,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

itemSchema.virtual("subTotal").get(function () {
  return this.price * this.qty;
});

const schema = new Schema(
  {
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

schema.virtual("total").get(function () {
  return this.items.reduce((total, item) => total + item.subTotal, 0);
});

// schema.virtual("transactionId").get(function () {
//   const date = new Date(this.createdAt);
//   const year = date.getFullYear().toString().padStart(4, 0);
//   const month = date.getMonth().toString().padStart(2, 0);
//   const day = date.getDate().toString().padStart(2, 0);
//   const no = this.transactionNo.toString().padStart(3, 0);
//   return `BSB${year}${month}${day}${no}`;
// });

schema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter());

  await mongoose
    .model("SampahStock")
    .deleteMany({ _sampahTransaction: doc._id });

  next();
});

schema.post("save", async function (doc) {
  if (doc.transactionType == "TABUNG") {
    await mongoose.model("BankTransaction").create({
      transactionType: "DEBIT",
      amount: doc.total,
      _sampahTransaction: doc._id,
      _nasabah: doc._nasabah,
    });
  }
  let stockType;

  if (doc.transactionType != "PENJUALAN") {
    stockType = "IN";
  } else {
    stockType = "OUT";
  }

  for (let i = 0; i < doc.items.length; i++) {
    const item = doc.items[i];
    console.log(item);
    await mongoose.model("SampahStock").create({
      _sampahType: item._sampahType._id,
      qty: item.qty,
      _sampahTransaction: doc._id,
      stockType: stockType,
    });
    console.log(stockType);
  }
});

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(
    MODEL_NAME,
    schema.plugin(require("mongoose-sequence")(mongoose), {
      inc_field: "transactionNo",
    })
  );
