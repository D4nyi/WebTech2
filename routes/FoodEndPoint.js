const express = require('express');
const router = express.Router();
const Food = require('./Food');
const mongoose = require('mongoose');

//Initialize db
router.get('/filldb', (req, res) => {
    //Data to add
    const foods = [
        {"type": "Drink", "name": "ASD", "price": 1111, "ingredients": ["A", "S", "D"]},
        {"type": "Drink", "name": "Syrup", "price": 250, "ingredients": ["Water", "Syrup", "Sweetener"]},
        {"type": "Drink", "name": "Red Wine", "price": 500, "ingredients": ["Red Grapes"]},
        {"type": "Drink", "name": "Wine", "price": 500, "ingredients": ["Grapes"]},
        {"type": "Food", "name": "Goulash", "price": 1500, "ingredients": ["Carrot", "Paprika", "Meat", "Noodles"]},
        {
            "type": "Food",
            "name": "Grilled Chicken Breasts in Sweet&Spicy coat with Salad",
            "price": 2000,
            "ingredients": ["Chicken Breasts", "Seasoning", "Home Made Salad"]
        },
        {
            "type": "Food",
            "name": "Dobos Cake",
            "price": 900,
            "ingredients": ["Flour", "Burnt Sugar", "Margarine", "Nuts"]
        }
    ];

    foods.forEach((item) => {
        Food.reate({ //Add item to db
            _id: new mongoose.Types.ObjectId(),
            type: item['type'],
            name: item['name'],
            price: item['price'],
            ingredients: item['ingredients']
        }, (err, doc) => { //Error Handler
            if (err !== null) {
                console.log("Hiba!" + err.toString());
                console.log(doc);
                return res.status(415).send(doc);
            }
        });
    });
    res.status(200).send("Foods Inserted");
});

router.post("/add", (req, res) => {
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

router.get("/listDrinks", (req, res) => {
    Food.find({"type": "Drink"}).exec((err, doc) => {
        res.status(200).send(doc);
    });
});

router.get("/listfoods", (req, res) => {
    Food.find({"type": "Food"}).exec((err, doc) => {
        res.status(200).send(doc);
    });
});

//Ez még nincs kész
//Ez szmáloná ki az orderbe a totalPrice-t
function getTotalPrice(foodNames) {
    let totalPrice = 0;
    foodNames.forEach((item) =>
        Food.find({"name": item}).exec((err, doc) => {
            totalPrice += doc.price;
        }));
    return totalPrice;
}

module.exports = router;