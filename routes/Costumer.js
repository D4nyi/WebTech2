var mongoose = require('mongoose');
var db = require('./Restaurant');
var Schema = mongoose.Schema;

var CostumerSchema = new Schema({
    _id: Schema.ObjectId,
    name: String,
    billing_address: String
}, {versionKey: false});

module.exports = db.model("Costumer", CostumerSchema);