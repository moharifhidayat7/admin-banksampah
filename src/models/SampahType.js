import mongoose, { Schema } from "mongoose";
import "./SampahCategory";

const MODEL_NAME = "SampahType";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    _category: {
      type: Schema.Types.ObjectId,
      ref: "SampahCategory",
      required: true,
      autopopulate: true,
      get: function (v) {
        if (this.name) {
          return this._category.name;
        }
        if (this.unit) {
          return "ada unit";
        }
      },
    },
    price: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

schema.plugin(require("mongoose-autopopulate"));

export { schema as SampahTypeSchema };

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema);
