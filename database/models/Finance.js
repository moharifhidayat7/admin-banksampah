import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FinanceSchema = new Schema({
    note: {
        type: String,
    },
    transactionType: {
        type: String,
        enum: ["pengeluaran", "pemasukan"],
        required: true,
    },
    transactionTo: {
        type: String,
        enum: ["gudang", "kompos"],
    },
    amount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
mongoose.models = {};

const Finance = mongoose.model("Finance", FinanceSchema);

export { Finance };
