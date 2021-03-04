import mongoose from 'mongoose';

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
    },
    qtyfier: {
        type: String,
        default: 'item',
    },
});
const SampahCategory = mongoose.model('Sampah Category', SampahCategorySchema);
const SampahType = mongoose.model('Sampah Type', SampahTypeSchema);

export { SampahCategory, SampahType };
