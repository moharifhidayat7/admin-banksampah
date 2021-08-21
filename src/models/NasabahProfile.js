import mongoose, { Schema } from "mongoose";

import "./AccountType";
import "./BankTransaction";

const MODEL_NAME = "NasabahProfile";

const schema = new Schema(
  {
    _ktp: {
      type: Schema.Types.ObjectId,
      ref: "File",
    },
    _picture: {
      type: Schema.Types.ObjectId,
      ref: "File",
    },
    _accountType: {
      type: Schema.Types.ObjectId,
      ref: "AccountType",
      required: true,
      autopopulate: true,
    },
    nik: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["L", "P", "-"],
      default: "-",
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    birthdate: {
      type: String,
    },
    rekening: {
      type: String,
    },
  },
  { timestamps: true }
);

schema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter());

  await mongoose.model("BankTransaction").deleteMany({ _nasabah: doc._id });

  next();
});

schema.pre("save", async function (next) {
  const accountType = await mongoose
    .model("AccountType")
    .findOne({ _id: this._accountType });

  const code = accountType.code;
  const counter = accountType.counter;
  this.rekening =
    code.toString().padStart(2, 0) + counter.toString().padStart(4, 0);
  next();
});
schema.post("save", async function (doc, next) {
  await mongoose
    .model("AccountType")
    .updateOne(
      { _id: this._accountType },
      { $inc: { counter: 1 } },
      { strict: false }
    );
  next();
});

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema);
