import mongoose, { Schema } from "mongoose";
import "./ProductCategory";

const MODEL_NAME = "Product";

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        _category: {
            type: Schema.Types.ObjectId,
            ref: "ProductCategory",
            autopopulate: true,
        },
        description: {
            type: String,
        },
        stock: {
            type: Number,
            default: -1,
        },
        status: {
            type: String,
            enum: ['Offline','Online']
        },
    },
    { timestamps: true }
);

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
    mongoose.model(MODEL_NAME, schema);

export { schema as ProductSchema };
