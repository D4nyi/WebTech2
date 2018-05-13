var mongoose = require('mongoose');
var db = require('./Restaurant');
var Schema = mongoose.Schema;

var BartenderSchema = new Schema({
    _id: Schema.ObjectId,
    name: String
}, {versionKey: false});

module.exports = db.model("Bartender", BartenderSchema);