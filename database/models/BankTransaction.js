import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BankTransactionSchema = new Schema({
    note: {
        type: String,
    },
    transactionType: {
        type: String,
        enum: ["debet", "credit"],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    _nasabah: {
        type: Schema.Types.ObjectId,
        ref: "NasabahProfile",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
mongoose.models = {};

const BankTransaction = mongoose.model(
    "BankTransaction",
    BankTransactionSchema
);

export { BankTransaction };
