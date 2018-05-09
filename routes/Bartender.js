const mongoose = require('mongoose');
const db = require('./Restaurant');
const Schema = mongoose.Schema;

const BartenderSchema = new Schema({
    _id: Schema.ObjectId,
    name: String
}, {versionKey: false});

module.exports = db.model("Bartender", BartenderSchema);