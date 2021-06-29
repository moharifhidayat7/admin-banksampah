import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    note: {
        type: String,
    },
    transactionType: {
        type: String,
        enum: ["pengeluaran", "pemasukan"],
        required: true,
    },
    divisi: {
        type: String,
        enum: ["bank", "gudang", "kompos"],
        required: true,
    },
    _nasabah: {
        type: Schema.Types.ObjectId,
        ref: "NasabahProfile",
        required: function () {
            return (
                this.divisi == "gudang" && this.transactionType == "pemasukan"
            );
        },
    },
    amount: {
        type: Number,
        required: function () {
            return this.divisi == "bank";
        },
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

const Transaction = mongoose.model("Transaction", TransactionSchema);

export { Transaction };
