var mongoose = require('mongoose');
var db = require('./Restaurant');
var Schema = mongoose.Schema;

var FoodSchema = new Schema({
        _id: Schema.ObjectId,
        type: String,
        name: String,
        price: Number,
        ingredients: Array
    }, {versionKey: false}
);

module.exports = db.model("Food", FoodSchema);