import mongoose, { Schema } from "mongoose";

import AccountType from "@models/AccountType";

const MODEL_NAME = "NasabahProfile";

const schema = new Schema(
  {
    nik: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    birthdate: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Laki-Laki", "Perempuan"],
      required: true,
    },
    _accountType: {
      type: Schema.Types.ObjectId,
      ref: "AccountType",
      required: true,
      autopopulate: true,
    },
    rekening: {
      type: String,
    },
    ktp: {
      type: String,
    },
  },
  { timestamps: true }
);

schema.pre("save", async function (next) {
  const type = await AccountType.findOne({ _id: this._accountType });

  this.rekening =
    type.code.toString().padStart(2, 0) +
    type.counter.toString().padStart(4, 0);
  next();
});
schema.post("save", async function (doc, next) {
  await AccountType.updateOne(
    { _id: this._accountType },
    { $inc: { counter: 1 } },
    { strict: false }
  );
  next();
});

schema.plugin(require("mongoose-autopopulate"));
export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema);
