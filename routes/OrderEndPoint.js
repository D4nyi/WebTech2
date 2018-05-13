const express = require('express');
const router = express.Router();
const Order = require('./Order');
const mongoose = require('mongoose');

const getTotalPrice = function (foods) {
    let totalPrice = 0;
    foods.forEach(function (item) {
        totalPrice += item.price;
    });
    return totalPrice;
};

router.post("/add", function (req, res) {
    const foods = req['foods'];
    const price = getTotalPrice(foods);
    Order.create({ //Add item to db
        _id: new mongoose.Types.ObjectId(),
        status: "Open",
        fulfilled: false,
        received: false,
        foods: req.body['foods'],
        bartendersName: req.body['bartendersName'],
        costumersName: req.body['costumersName'],
        totalCost: price
    }, (err, doc) => { //Error Handler
        if (err !== null) {
            console.log("Hiba!" + err.toString());
            console.log(doc);
            return res.status(415).send(doc);
        }
    });
});

router.get("/listOrders", function (req, res) {
    Order.find({}).exec((err, doc) => {
        res.status(200).send(doc);
    });
});

router.get("/listOpenOrders", (req, res) => {
    Order.find({status: true}).exec((err, doc) => {
        res.status(200).send(doc);
    });
});

router.post("/fulfillOrder", function (req, res) {
    Order.update(
        {bartendersName: req.body['bartendersName']},
        {$set: {received: req.body['received']}}, (err, doc) => {
            if (err !== null) {
                res.status(500).json({error: "Application error"});
                return console.log(err);
            }
            res.status(200).json(doc);
        });
});


router.post("/closeOrder", function (req, res) {
    Order.update(
        {bartendersName: req.body['bartendersName']},
        {$set: {fulfilled: req.body['fulfilled'], status: req.body['status']}}, (err, doc) => {
            if (err !== null) {
                res.status(500).json({error: "Application error"});
                return console.log(err);
            }
            res.status(200).json(doc);
        });
});


module.exports = router;
