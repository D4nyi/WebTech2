const mongoose = require('mongoose');

const db = mongoose.createConnection('mongodb://localhost:27017/Restaurant', {autoIndex: true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('MongoDB is Open');
});


const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    _id: Schema.ObjectId,
    type: String,
    name: String,
    price: Number,
    ingredients: Array
}, {versionKey: false});

module.exports = db.model('Food', FoodSchema);