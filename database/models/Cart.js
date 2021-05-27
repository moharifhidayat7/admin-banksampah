import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    _product: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    _nasabah: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});
mongoose.models = {};

const Cart = mongoose.model("Cart", CartSchema);

export { Cart };
