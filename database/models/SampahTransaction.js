import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SampahTransactionSchema = new Schema({
    transactionType: {
        type: String,
        enum: ['saving', 'cash'],
        required: true,
    },
    _account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    },
    _priceList: {
        type: Schema.Types.ObjectId,
        ref: 'Price List',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const SampahTransaction = mongoose.model(
    'Sampah Transaction',
    SampahTransactionSchema
);

export { SampahTransaction };
