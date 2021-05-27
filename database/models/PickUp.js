import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PickUpSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    picture: {
        type: String,
    },
    _nasabah: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    isPickedUp: {
        type: Boolean,
        default: false,
    },
});
mongoose.models = {};

const PickUp = mongoose.model("PickUp", PickUpSchema);

export { PickUp };
