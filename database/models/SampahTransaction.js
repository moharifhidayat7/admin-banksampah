import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SampahTransactionSchema = new Schema({
    transactionType: {
        type: String,
        enum: ["saving", "cash"],
        required: true,
    },
    _nasabah: {
        type: Schema.Types.ObjectId,
        ref: "NasabahProfile",
    },
    guest: {
        name: {
            type: String,
        },
        address: {
            type: String,
        },
        mobile: {
            type: String,
        },
    },
    transactionDate: {
        type: Date,
        default: Date.now,
    },
    items: [
        {
            _sampahType: {
                _id: {
                    type: Schema.Types.ObjectId,
                    ref: "SampahType",
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                qtyfier: {
                    type: String,
                    required: true,
                },
            },
            price: {
                type: Number,
                required: true,
            },
            qty: {
                type: Number,
                required: true,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

mongoose.models = {};

const SampahTransaction = mongoose.model(
    "SampahTransaction",
    SampahTransactionSchema
);

export { SampahTransaction };
