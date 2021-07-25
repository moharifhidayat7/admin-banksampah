import mongoose, { Schema } from "mongoose";
import "./SampahType";

const MODEL_NAME = "SampahStock";

const schema = new Schema(
  {
    _sampahTransaction: {
      type: Schema.Types.ObjectId,
      ref: "SampahTransaction",
    },
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

schema.pre("deleteMany", async function (next) {
  const items = await this.model.find(this.getFilter());
  console.log("pre stok delete many");
  for (let i = 0; i < items.length; i++) {
    const doc = items[i];

    const increment =
      doc.stockType == "OUT"
        ? doc.qty
        : doc.stockType == "IN"
        ? doc.qty * -1
        : 0;

    await mongoose.model("SampahType").findByIdAndUpdate(doc._sampahType._id, {
      $inc: {
        stock: increment,
      },
    });
  }

  next();
});

schema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter());

  const increment =
    doc.stockType == "IN" ? doc.qty : doc.stockType == "OUT" ? doc.qty * -1 : 0;
  await mongoose.model("SampahType").findByIdAndUpdate(doc._sampahType, {
    $inc: {
      stock: increment,
    },
  });
  next();
});

schema.post("save", async function (doc) {
  const increment =
    doc.stockType == "IN" ? doc.qty : doc.stockType == "OUT" ? doc.qty * -1 : 0;

  await mongoose.model("SampahType").findByIdAndUpdate(doc._sampahType, {
    $inc: {
      stock: increment,
    },
  });
});

schema.plugin(require("mongoose-autopopulate"));

export { schema as SampahTypeSchema };

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema);
