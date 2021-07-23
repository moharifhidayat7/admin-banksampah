import mongoose, { Schema } from "mongoose";
import "./SampahType";

const MODEL_NAME = "SampahStock";

const schema = new Schema(
  {
    _sampahType: {
      type: Schema.Types.ObjectId,
      ref: "SampahType",
      required: true,
      autopopulate: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
    },
    stockType: { type: String, enum: ["IN", "OUT", "OPNAME"], required: true },
  },
  { timestamps: true }
);

schema.post("save", async function (doc) {
  if (doc.stockType == "OPNAME") {
    await mongoose.model("SampahType").findByIdAndUpdate(doc._sampahType, {
      stock: doc.qty,
    });
  } else {
    const increment =
      doc.stockType == "IN"
        ? doc.qty
        : doc.stockType == "OUT"
        ? doc.qty * -1
        : 0;

    await mongoose.model("SampahType").findByIdAndUpdate(doc._sampahType, {
      $inc: {
        stock: increment,
      },
    });
  }
});

schema.plugin(require("mongoose-autopopulate"));

export { schema as SampahTypeSchema };

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema);
