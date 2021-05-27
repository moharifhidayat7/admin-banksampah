import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    _account: {
        type: Schema.Types.ObjectId,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    item: [
        {
            _product: {
                type: Schema.Types.ObjectId,
                required: true,
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
});
mongoose.models = {};

const Order = mongoose.model("Order", OrderSchema);

export { Order };
