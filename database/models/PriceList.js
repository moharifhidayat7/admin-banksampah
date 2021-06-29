import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PriceListSchema = new Schema({
    _sampahType: {
        type: Schema.Types.ObjectId,
        ref: "SampahType",
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
mongoose.models = {};

const PriceList = mongoose.model("PriceList", PriceListSchema);

export { PriceList };
