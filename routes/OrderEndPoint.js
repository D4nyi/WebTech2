var express = require('express');
var router = express.Router();
var Order = require('./Order');
var mongoose = require('mongoose');

var getTotalPrice = function (foods) {
    var totalPrice = 0;
    foods.forEach(function (item) {
        totalPrice += item.price;
    });
    return totalPrice;
};

router.post("/add", function (req, res) {
    var foods = req['foods'];
    var price = getTotalPrice(foods);
    Order.create({ //Add item to db
        _id: new mongoose.Types.ObjectId(),
        status: "Open",
        fulfilled: false,
        received: false,
        foods: req.body['foods'],
        bartendersName: req.body['bartendersName'],
        costumersName: req.body['costumersName'],
        totalCost: price
    }, function (err, doc) { //Error Handler
        if (err !== null) {
            console.log("Hiba!" + err.toString());
            console.log(doc);
            return res.status(415).send(doc);
        }
    });
});

module.exports = router;
