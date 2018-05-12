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

//Initialize db
router.get('/filldb', function (req, res) {
    //Data to add
    const orders = [
        {
            status: "Open",
            fulfilled: true,
            received: true,
            foods: [
                {name: "Goulash", price: 1500},
                {name: "Syrup", price: 250},
                {name: "Dobos Cake", price: 900}
            ],
            bartendersName: "Nagy Piroska",
            costumersName: "Urbán Gábor"
        },
        {
            status: "Open",
            fulfilled: true,
            received: false,
            foods: [
                {name: "Grilled Chicken Breasts in Sweet&Spicy coat with Salad", price: 2000},
                {name: "Wine", price: 500}
            ],
            bartendersName: "Bele Sándor",
            costumersName: "Horvát Rozi"
        },
        {
            status: "Open",
            fulfilled: false,
            received: true,
            foods: [
                {name: "Goulash", price: 1500,},
                {name: "Grilled Chicken Breasts in Sweet&Spicy coat with Salad", price: 2000},
                {name: "Red Wine", price: 500},
                {name: "Dobos Cake", price: 900}],
            bartendersName: "Tóth Melinda",
            costumersName: "Kis Pista"
        },
        {
            status: "Closed",
            fulfilled: true,
            received: true,
            foods: [
                {name: "Dobos Cake", price: 900},
                {name: "Syrup", price: 250}
            ],
            bartendersName: "Megyeri Sánod",
            costumersName: "Nagy Tamás"
        },
        {
            status: "Closed",
            fulfilled: true,
            received: false,
            foods: [
                {name: "Grilled Chicken Breasts in Sweet&Spicy coat with Salad", price: 2000},
                {name: "Red Wine", price: 500},
                {name: "Dobos Cake", price: 900,}
            ],
            bartendersName: "Péntáros Lőrincz",
            costumersName: "Kalla László"
        },
        {
            status: "Closed",
            fulfilled: false,
            received: true,
            foods: [
                {name: "Grilled Chicken Breasts in Sweet&Spicy coat with Salad", price: 2000},
                {name: "Wine", price: 500}
            ],
            bartendersName: "Kertész Ádám",
            costumersName: "Farkas Máté"
        },
        {
            status: "Closed",
            fulfilled: false,
            received: false,
            foods: [
                {name: "Goulash", price: 1500,},
                {name: "Wine", price: 500}
            ],
            bartendersName: "Németh Ferenc",
            costumersName: "Petróczki Zoltán"
        }
    ];
    let foods;
    let price = 0;
    orders.forEach(function (item) {
        foods = item['foods'];
        price = getTotalPrice(foods);

        Order.create({ //Add item to db
            _id: new mongoose.Types.ObjectId(),
            status: item['status'],
            fulfilled: item['fulfilled'],
            received: item['received'],
            foods: foods,
            bartendersName: item['bartendersName'],
            costumersName: item['costumersName'],
            totalCost: price
        }, function (err, doc) { //Error Handler
            if (err !== null) {
                console.log("Hiba!" + err.toString());
                console.log(doc);
                return res.status(415).send(doc);
            }
        });
    });
    res.status(200).send("Orders Inserted");
});

router.post("/add", (req, res) => {
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

router.get("/listOrders", (req, res) => {
    Order.find({}).exec((err, doc) => {
        res.status(200).send(doc);
    });
});

router.get("/listOpenOrders", (req, res) => {
    Order.find({status: true}).exec((err, doc) => {
        res.status(200).send(doc);
    });
});

router.post("/fulfillOrder", (req, res) => {
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


router.post("/closeOrder", (req, res) => {
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
