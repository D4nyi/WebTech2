const express = require('express');
const router = express.Router();
const Bartender = require('./Bartender');
const mongoose = require('mongoose');

router.post("/add", function (req, res) {
    Bartender.create({ //Add item to db
        _id: new mongoose.Types.ObjectId(),
        name: item['name']
    }, (err, doc) => {
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

module.exports = router;