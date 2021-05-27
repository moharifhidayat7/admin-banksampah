import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SampahCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

const SampahTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    _category: {
        type: Schema.Types.ObjectId,
        ref: "SampahCategory",
    },
    qtyfier: {
        type: String,
        default: "item",
    },
});
mongoose.models = {};

const SampahCategory = mongoose.model("SampahCategory", SampahCategorySchema);
const SampahType = mongoose.model("SampahType", SampahTypeSchema);

export { SampahCategory, SampahType };
