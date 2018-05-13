var express = require('express');
var router = express.Router();
var Food = require('./Food');
var mongoose = require('mongoose');

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
    Food.find({"type": "Drink"}).exec(function (err, doc) {
        res.status(200).send(doc);
    });
});

router.get("/listfoods", function (req, res) {
    Food.find({"type": "Food"}).exec(function (err, doc) {
        res.status(200).send(doc);
    });
});

module.exports = router;