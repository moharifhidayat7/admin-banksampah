import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "User";

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [
      "manager",
      "gudang",
      "bendahara",
      "penjualan",
      "client_gudang",
      "client_bendahara",
      "client_penjualan",
    ],
    required: true,
  },
});

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema);
