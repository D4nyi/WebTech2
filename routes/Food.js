const mongoose = require('mongoose');
const db = require('./Restaurant');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
        _id: Schema.ObjectId,
        type: String,
        name: String,
        price: Number,
        ingredients: Array
    }, {versionKey: false}
);

module.exports = db.model("Food", FoodSchema);