const express = require('express');
const router = express.Router();
const Food = require('./Food');
const mongoose = require('mongoose');

router.post("/add", function (req, res) {
    Food.create({ //Add item to db
        _id: new mongoose.Types.ObjectId(),
        type: req.body['type'],
        name: req.body['name'],
        price: req.body['price'],
        ingredients: req.body['ingredients']
    }, function (err, doc) {
        if (err !== null) { //Error Handler
            console.log("Hiba!" + err.toString());
            console.log(doc);
            res.status(415).send(doc);
        }
    });
});

router.get("/listDrinks", function (req, res) {
    Food.find({"type": "Drink"}).exec((err, doc) => {
        res.status(200).send(doc);
    });
});

router.get("/listfoods", function (req, res) {
    Food.find({"type": "Food"}).exec((err, doc) => {
        res.status(200).send(doc);
    });
});

module.exports = router;