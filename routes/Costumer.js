const mongoose = require('mongoose');
const db = require('./Restaurant');
const Schema = mongoose.Schema;

const CostumerSchema = new Schema({
    _id: Schema.ObjectId,
    name: String,
    billing_address: String
}, {versionKey: false});

module.exports = db.model("Costumer", CostumerSchema);