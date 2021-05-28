import mongoose, { Schema } from "mongoose";
import "./NasabahProfile";

const MODEL_NAME = "SampahSale";

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
        noNota: {
            type: String,
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
        },
    },
    { timestamps: true }
);

schema.plugin(require("mongoose-autopopulate"));

export default mongoose.models[MODEL_NAME] ||
    mongoose.model(MODEL_NAME, schema);
