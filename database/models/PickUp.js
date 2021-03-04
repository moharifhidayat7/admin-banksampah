import mongoose from 'mongoose';

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

const PickUp = mongoose.model('Pick Up', PickUpSchema);

export { PickUp };
