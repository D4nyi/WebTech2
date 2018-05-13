var express = require('express');
var router = express.Router();
var Costumer = require('./Costumer');
var Order = require('./Order');
var Food = require('./Food');
var mongoose = require('mongoose');

var getTotalPrice = function (foods) {
    var totalPrice = 0;
    foods.forEach(function (item) {
        totalPrice += Number(item.price);
    });
    return totalPrice;
};

router.post("/add", function (req, res) {
    Costumer.create({ //Add item to db
        _id: new mongoose.Types.ObjectId(),
        name: req.body['name'],
        billing_address: req.body['billing_address']
    }, function (err, doc) {
        if (err !== null) { //Error Handler
            console.log("Hiba!" + err.toString());
            console.log(doc);
            res.status(415).send(doc);
        }
    });
});

router.post('/orderFood', function (req, res) {
    var foods = req.body['foods'];
    var price = getTotalPrice(foods);
    Order.create({ //Add item to db
        _id: new mongoose.Types.ObjectId(),
        status: "Open",
        fulfilled: false,
        received: false,
        foods: foods,
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

router.get("/listDrinks", function (req, res) {
    Food.find({"type": "Drink"}).exec(function (err, doc) {
        if (err) {
            res.status(415).send(err.toString());
        }
        res.status(200).send(doc);
    });
});

router.get("/listFoods", function (req, res) {
    Food.find({"type": "Food"}).exec(function (err, doc) {
        if (err) {
            res.status(415).send(err.toString());
        }
        res.status(200).send(doc);
    });
});

module.exports = router;