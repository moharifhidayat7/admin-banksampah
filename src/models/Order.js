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
                    _id: {
                        type: Schema.Types.ObjectId,
                        required: true,
                    },
                    name: {
                        type: String,
                        required: true,
                    },
                    price: {
                        type: Number,
                        required: true,
                    },
                    description: {
                        type: String,
                    },
                },
                qty: {
                    type: Number,
                    required: true,
                },
            },
        ],
        payment: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["Sudah Dibayar", "Menunggu Pembayaran", "Dibatalkan"],
        },
    },
    { timestamps: true }
);

export default mongoose.models[MODEL_NAME] ||
    mongoose.model(MODEL_NAME, schema);
