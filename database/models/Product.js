import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    stock: {
        type: Number,
        default: -1,
    },
});

const Product = mongoose.model('Product', ProductSchema);

export { Product };
