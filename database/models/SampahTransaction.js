import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
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
});

const SampahTransactionSchema = new Schema({
    transactionType: {
        type: String,
        enum: ["saving", "cash", "penjualan", "pemasukan"],
        required: true,
    },
    _nasabah: {
        type: Schema.Types.ObjectId,
        ref: "NasabahProfile",
        required: function () {
            return this.transactionType == "saving";
        },
    },
    amount: {
        type: Number,
        required: function () {
            return (
                this.transactionType == "penjualan" ||
                this.transactionType == "pemasukan"
            );
        },
    },
    nota: {
        type: String,
    },
    note: {
        type: String,
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
    items: {
        type: [ItemsSchema],
        required: function () {
            return (
                this.transactionType == "cash" ||
                this.transactionType == "saving"
            );
        },
    },
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
