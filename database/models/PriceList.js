import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PriceListSchema = new Schema({
    item: [
        {
            _sampahType: {
                type: Schema.Types.ObjectId,
                required: true,
            },
            price: {
                type: Number,
                default: 0,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const PriceList = mongoose.model('Price List', PriceListSchema);

export { PriceList };
