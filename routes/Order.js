const mongoose = require('mongoose');
const db = require('./Restaurant');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    _id: Schema.ObjectId,
    status: {enum: ["Open", "Close"]},
    fulfilled: Boolean,
    received: Boolean,
    foodNames: Array,
    bartendersName: String,
    costumersName: String,
    totalCost: Number
}, {versionKey: false});

module.exports = db.model("Order", OrderSchema);