const express = require('express');
const router = express.Router();
const Order = require('./Restaurant');
const mongoose = require('mongoose');


router.get('/bar/filldb', function (req, res) {
    //Data to add
    const bars = [
        {"status": 0, "fulfilled": 0, "received": 0, "foodNames": ["Goulash", "Syrup", "Dobos Cake"]},
        {
            "status": 0,
            "fulfilled": 0,
            "received": 1,
            "foodNames": ["Grilled Chicken Breasts in Sweet&Spicy coat with Salad", "Wine"]
        },
        {
            "status": 0,
            "fulfilled": 1,
            "received": 0,
            "foodNames": ["Goulash", "Grilled Chicken Breasts in Sweet&Spicy coat with Salad", "Red Wine", "Dobos Cake"]
        },
        {"status": 1, "fulfilled": 0, "received": 0, "foodNames": ["Dobos Cake", "Syrup"]},
        {
            "status": 1,
            "fulfilled": 0,
            "received": 1,
            "foodNames": ["Grilled Chicken Breasts in Sweet&Spicy coat with Salad", "Red Wine", "Dobos Cake"]
        },
        {
            "status": 1,
            "fulfilled": 1,
            "received": 0,
            "foodNames": ["Grilled Chicken Breasts in Sweet&Spicy coat with Salad", "Wine"]
        },
        {"status": 1, "fulfilled": 1, "received": 1, "foodNames": ["Goulash", "Wine"]}
    ];

    bars.forEach((item) => {
        Order.create({ //Add item to db
            _id: new mongoose.Types.ObjectId(),
            status: item['status'] === 0,
            fulfilled: item['fulfilled'] === 0,
            received: item['received'] === 0,
            foodNames: item['foodNames'],
            totalCost: -1
        }, (err, doc) => { //Error Handler
            if (err !== null) {
                console.log("Hiba!" + err.toString());
                console.log(doc);
                return res.status(415).send(doc);
            }
        });
    });
    res.status(200).send("Data Inserted");
});

router.post("/bar/add", function (req, res) {
    Order.create({ //Add item to db
        _id: new mongoose.Types.ObjectId(),
        status: item['status'] === 0,
        fulfilled: item['fulfilled'] === 0,
        received: item['received'] === 0,
        foodNames: item['foodNames'],
        totalCost: -1
    }, (err, doc) => { //Error Handler
        if (err !== null) {
            console.log("Hiba!" + err.toString());
            console.log(doc);
            return res.status(415).send(doc);
        }
    });
});

module.exports = router;