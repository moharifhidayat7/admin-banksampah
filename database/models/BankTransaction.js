import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BankTransactionSchema = new Schema({
    note: {
        type: String,
    },
    transactionType: {
        type: String,
        enum: ['debet', 'credit'],
        required: true,
    },
    _account: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const BankTransaction = mongoose.model(
    'Bank Transaction',
    BankTransactionSchema
);

export { BankTransaction };
