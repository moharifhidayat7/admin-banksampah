import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SampahCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});
mongoose.models = {};

const SampahCategory = mongoose.model("SampahCategory", SampahCategorySchema);

export default SampahCategory;
