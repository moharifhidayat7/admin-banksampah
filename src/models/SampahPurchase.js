import mongoose, { Schema } from "mongoose";
import "./NasabahProfile";

const MODEL_NAME = "SampahPurchase";

const schema = new Schema(
    {
        transactionType: {
            type: String,
            enum: ["TABUNG", "CASH"],
            required: true,
        },
        _nasabah: {
            _id: {
                type: Schema.Types.ObjectId,
                ref: "NasabahProfile",
                autopopulate: true,
            },
            name: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            mobile: {
                type: String,
            },
        },
        note: {
            type: String,
        },
        transactionDate: {
            type: String,
            required: true,
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
            },
        ],
    },
    { timestamps: true }
);

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
    mongoose.model(MODEL_NAME, schema);
