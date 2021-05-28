import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SampahTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    _category: {
        type: Schema.Types.ObjectId,
        ref: "SampahCategory",
    },
    price: {
        type: Number,
        required: true,
    },
    denom: {
        type: String,
        required: true,
    },
});
mongoose.models = {};

const SampahType = mongoose.model("SampahType", SampahTypeSchema);

export default SampahType;
