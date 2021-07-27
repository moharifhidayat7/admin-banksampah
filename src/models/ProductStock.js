import mongoose, { Schema } from "mongoose";
import "./Product";

const MODEL_NAME = "ProductStock";

const schema = new Schema(
  {
    _product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
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

// schema.pre("deleteMany", async function (next) {
//   const items = await this.model.find(this.getFilter());
//   for (let i = 0; i < items.length; i++) {
//     const doc = items[i];

//     const increment =
//       doc.stockType == "OUT"
//         ? doc.qty
//         : doc.stockType == "IN"
//         ? doc.qty * -1
//         : 0;

//     await mongoose.model("Product").findByIdAndUpdate(doc._product._id, {
//       $inc: {
//         stock: increment,
//       },
//     });
//   }

//   next();
// });

schema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter());

  const increment =
    doc.stockType == "OUT" ? doc.qty : doc.stockType == "IN" ? doc.qty * -1 : 0;

  const newStock =
    doc._product.stock + increment < 0 ? doc._product.stock * -1 : increment;

  await mongoose.model("Product").findByIdAndUpdate(doc._product._id, {
    $inc: {
      stock: newStock,
    },
  });
  next();
});

schema.post("save", async function (doc) {
  const increment =
    doc.stockType == "IN" ? doc.qty : doc.stockType == "OUT" ? doc.qty * -1 : 0;

  await mongoose.model("Product").findByIdAndUpdate(doc._product, {
    $inc: {
      stock: increment,
    },
  });
});

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema);
