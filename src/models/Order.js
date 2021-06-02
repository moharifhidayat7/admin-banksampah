import mongoose, { Schema } from "mongoose";
import "./Product";

const MODEL_NAME = "Order";

const schema = new Schema(
    {
        customer: {
            type: String,
        },
        items: [
            {
                _product: {
                    type: Schema.Types.ObjectId,
                    required: true,
                },
                qty: {
                    type: Number,
                    required: true,
                },
            },
        ],
        status: {
            type: String,
            enum: ["Terbayar", "Menunggu Pembayaran", "Dibatalkan"],
        },
    },
    { timestamps: true }
);

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
    mongoose.model(MODEL_NAME, schema);
