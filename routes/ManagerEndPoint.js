var express = require('express');
var router = express.Router();
var Order = require('./Order');

router.get("/listOrders", function (req, res) {
    Order.find({}).exec(function (err, doc) {
        res.status(200).send(doc);
    });
});

router.get("/fulfilledOrders", function (req, res) {
    Order.find({fulfilled: true}).exec(function (err, doc) {
        if (err) {
            res.status(415).send(err);
        }
        res.status(200).send(doc);
    })
});

module.exports = router;