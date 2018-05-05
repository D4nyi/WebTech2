const mongoose = require('mongoose');

const db = mongoose.createConnection('mongodb://localhost:27017/Restaurant', {autoIndex: true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
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

const CostumerSchema = new Schema({
    _id: Schema.ObjectId,
    name: String,
    billing_address: String
}, {versionKey: false});

const BartenderSchema = new Schema({
    _id: Schema.ObjectId,
    name: String
}, {versionKey: false});

const OrderSchema = new Schema({
    _id: Schema.ObjectId,
    status: Boolean,//true -> open, false -> closed
    fulfilled: Boolean,
    received: Boolean,
    foodNames: Array,
    totalCost: Number
}, {versionKey: false});

module.exports = db.model("Food", FoodSchema);
module.exports = db.model("Costumer", CostumerSchema);
module.exports = db.model("Bartender", BartenderSchema);
module.exports = db.model("Order", OrderSchema);