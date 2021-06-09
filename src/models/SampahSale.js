import mongoose, { Schema } from "mongoose";
import "./NasabahProfile";

const MODEL_NAME = "SampahSale";

const schema = new Schema(
    {
        note: {
            type: String,
        },
        customer: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        mobile: {
            type: String,
        },
        transactionDate: {
            type: String,
        },
        items: [
            {
                _sampahType: {
                    _id: {
                        type: String,
                    },
                    category: {
                        type: String,
                        required: true,
                    },
                    price: {
                        type: Number,
                        required: true,
                    },
                    name: {
                        type: String,
                        required: true,
                    },
                    denom: {
                        type: String,
                        required: true,
                    },
                },
                qty: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
    mongoose.model(MODEL_NAME, schema);
