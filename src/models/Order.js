import mongoose, { Schema } from "mongoose";
import { ProductSchema } from "./Product";
import "./NasabahProfile";

const MODEL_NAME = "Order";

const itemSchema = new Schema(
  {
    _product: {
      type: ProductSchema,
      required: true,
    },
    price: {
      type: Number,
      min: 1,
      default: function () {
        return this._product.price;
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
    },
    payment: {
      type: Number,
      min: 1,
    },
    items: [itemSchema],
    status: {
      type: String,
      enum: ["SUCCESS", "PENDING", "CANCELED"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

schema.virtual("total").get(function () {
  return this.items.reduce((total, item) => total + item.subTotal, 0);
});

schema.post("save", async function (doc) {
  for (let i = 0; i < doc.items.length; i++) {
    const item = doc.items[i];
    await mongoose.model("ProductStock").create({
      _product: item._product._id,
      qty: item.qty,
      _order: doc._id,
      stockType: "OUT",
    });
  }
});

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(
    MODEL_NAME,
    schema.plugin(require("mongoose-sequence")(mongoose), {
      inc_field: "orderNo",
    })
  );
