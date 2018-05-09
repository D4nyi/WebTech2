const express = require('express');
const router = express.Router();
const Order = require('./Order');
const Food = require("./Food");
const mongoose = require('mongoose');

//Initialize db
router.get('/filldb', (req, res) => {
    //Data to add
    const bars = [
        {
            "status": true,
            "fulfilled": true,
            "received": true,
            "foodNames": ["Goulash", "Syrup", "Dobos Cake"],
            "bartendersName": "Nagy Piroska",
            "costumersName": "Urbán Gábor"
        },
        {
            "status": true,
            "fulfilled": true,
            "received": false,
            "foodNames": ["Grilled Chicken Breasts in Sweet&Spicy coat with Salad", "Wine"],
            "bartendersName": "Bele Sándor",
            "costumersName": "Horvát Rozi"
        },
        {
            "status": true,
            "fulfilled": false,
            "received": true,
            "foodNames": ["Goulash", "Grilled Chicken Breasts in Sweet&Spicy coat with Salad", "Red Wine", "Dobos Cake"],
            "bartendersName": "Tóth Melinda",
            "costumersName": "Kis Pista"
        },
        {
            "status": false,
            "fulfilled": true,
            "received": true,
            "foodNames": ["Dobos Cake", "Syrup"],
            "bartendersName": "Megyeri Sánod",
            "costumersName": "Nagy Tamás"
        },
        {
            "status": false,
            "fulfilled": true,
            "received": false,
            "foodNames": ["Grilled Chicken Breasts in Sweet&Spicy coat with Salad", "Red Wine", "Dobos Cake"],
            "bartendersName": "Péntáros Lőrincz",
            "costumersName": "Kalla László"
        },
        {
            "status": false,
            "fulfilled": false,
            "received": true,
            "foodNames": ["Grilled Chicken Breasts in Sweet&Spicy coat with Salad", "Wine"],
            "bartendersName": "Kertész Ádám",
            "costumersName": "Farkas Máté"
        },
        {
            "status": false,
            "fulfilled": false,
            "received": false,
            "foodNames": ["Goulash", "Wine"],
            "bartendersName": "Németh Ferenc",
            "costumersName": "Petróczki Zoltán"
        }
    ];

    bars.forEach((item) => {
        Order.create({ //Add item to db
            _id: new mongoose.Types.ObjectId(),
            status: item['status'],
            fulfilled: item['fulfilled'],
            received: item['received'],
            foodNames: item['foodNames'],
            bartendersName: item['bartendersName'],
            costumersName: item['costumersName'],
            totalPrice: Food.price.getTotalPrice(item['foodNames'])
        }, (err, doc) => { //Error Handler
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
    Order.create({ //Add item to db
        _id: new mongoose.Types.ObjectId(),
        status: req.body['status'],
        fulfilled: req.body['fulfilled'],
        received: req.body['received'],
        foodNames: req.body['foodNames'],
        bartendersName: req.body['bartendersName'],
        costumersName: req.body['costumersName']
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
    Order.find({"status": true}).exec((err, doc) => {
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
