import mongoose, { Schema } from "mongoose";
import "./NasabahProfile";
import "./SampahCategory";
import "./SampahType";

const MODEL_NAME = "SampahPurchase";

const ItemSchema = new Schema({
    _sampahType: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: "SampahType",
            required: true,
        },
        _category: {
            type: Schema.Types.ObjectId,
            ref: "SampahCategory",
            required: true,
            autopopulate: true,
        },
        price: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        denom: {
            type: String,
            required: true,
        },
    },
    qty: {
        type: Number,
        required: true,
    },
});

const schema = new Schema(
    {
        transactionType: {
            type: String,
            enum: ["TABUNG", "CASH"],
            required: true,
        },
        _nasabah: {
            type: Schema.Types.ObjectId,
            ref: "NasabahProfile",
            required: function () {
                return this.transactionType == "TABUNG";
            },
            autopopulate: true,
        },
        note: {
            type: String,
        },
        name: {
            type: String,
            required: function () {
                return this._nasabah == null;
            },
        },
        address: {
            type: String,
            required: function () {
                return this._nasabah == null;
            },
        },
        mobile: {
            type: String,
            required: function () {
                return this._nasabah == null;
            },
        },
        transactionDate: {
            type: Date,
            default: Date.now,
        },
        items: {
            type: [ItemSchema],
            required: true,
            autopopulate: true,
        },
    },
    { timestamps: true }
);

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
    mongoose.model(MODEL_NAME, schema);
