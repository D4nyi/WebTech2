var mongoose = require('mongoose');
var db = require('./Restaurant');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    _id: Schema.ObjectId,
    status: {type: String, enum: ["Open", "Closed"], require: [true, "Missing type!"]},
    fulfilled: Boolean,
    received: Boolean,
    foods: [{_id: false, name: String, price: Number}],
    bartendersName: String,
    costumersName: String,
    totalCost: Number
}, {versionKey: false});

module.exports = db.model("Order", OrderSchema);