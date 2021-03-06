var express = require('express');
var router = express.Router();
var Bartender = require('./Bartender');
var Order = require('./Order');
var mongoose = require('mongoose');

router.post("/add", function (req, res) {
    Bartender.create({ //Add item to db
        _id: new mongoose.Types.ObjectId(),
        name: item['name']
    }, function (err, doc) {
        if (err !== null) { //Error Handler
            console.log("Hiba!" + err.toString());
            console.log(doc);
            res.status(415).send(doc);
        }
    });
});

router.get("/rnd", function (req, res) {
    Bartender.count().exec(function (err, count) {
        var random = Math.floor(Math.random() * count);
        Bartender.findOne().skip(random).exec(function (err, doc) {
            if (err) {
                res.status(415).send(err.toString());
            }
            res.status(200).send(doc);
        });
    });
});

router.post("/fulfillOrder", function (req, res) {
    Order.update(
        {costumersName: req.body['costumersName']},
        {$set: {received: true, fulfilled: true, status: "Closed"}}, function (err, doc) {
            if (err !== null) {
                res.status(500).send(err);
            }
            res.status(200).send(doc);
        });
});

router.get("/listOpenOrders", function (req, res) {
    Order.find({status: "Open"}).exec(function (err, doc) {
        res.status(200).send(doc);
    });
});

module.exports = router;