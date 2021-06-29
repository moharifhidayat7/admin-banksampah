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
    _sampahTransaction: {
        type: Schema.Types.ObjectId,
        ref: "SampahTransaction",
        required: function () {
            return this.amount == null;
        },
    },
    amount: {
        type: Number,
        required: function () {
            return this._sampahTransaction == null;
        },
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
