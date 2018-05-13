const express = require('express');
const router = express.Router();
const Bartender = require('./Bartender');
const Order = require('./Order');
const Food = require('./Food');
const Costumer = require('./Costumer');
const mongoose = require('mongoose');

const getTotalPrice = function (foods) {
    let totalPrice = 0;
    foods.forEach(function (item) {
        totalPrice += Number(item.price);
    });
    return totalPrice;
};

//Initialize db
router.get('/', function (req, res) {
    //Data to add
    const bartenders = [
        {name: "Bele Sándor"},
        {name: "Tóth Melinda"},
        {name: "Nagy Piroska"},
        {name: "Megyeri József"},
        {name: "Pénztáros Lőrincz"},
        {name: "Kertész Ádám"},
        {name: "Németh Ferenc"}
    ];

    bartenders.forEach((item) => {
        Bartender.create({ //Add item to db
            _id: new mongoose.Types.ObjectId(),
            name: item['name']
        }, (err, doc) => { //Error Handler
            if (err !== null) {
                console.log("Hiba!" + err.toString());
                console.log(doc);
                return res.status(415).send(doc);
            }
        });
    });
    //Data to add
    const costumers = [
        {name: "Kis Pista", billing_address: "Mályinka Fő út 12."},
        {name: "Horvát Rozi", billing_address: "Miskolc vörösmarty utca 5."},
        {name: "Urbán Gábor", billing_address: "Nyiregyháza Kossuth út 33."},
        {name: "Nagy Tamás", billing_address: "Budapest Megyeri út 100."},
        {name: "Kalla László", billing_address: "Eger Tárkányi út 19."},
        {name: "Farkas Máté", billing_address: "Dunaújváros Határ út 35."},
        {name: "Szöllősi Dániel", billing_address: "Tiszaújváros Szent István út 20."}
    ];

    costumers.forEach((item) => {
        Costumer.create({ //Add item to db
            _id: new mongoose.Types.ObjectId(),
            name: item['name'],
            billing_address: item['billing_address']
        }, (err, doc) => { //Error Handler
            if (err !== null) {
                console.log("Hiba!" + err.toString());
                console.log(doc);
                return res.status(415).send(doc);
            }
        });
    });
    //Data to add
    const foods = [
        {type: "Drink", name: "ASD", price: 1111, ingredients: ["A", "S", "D"]},
        {type: "Drink", name: "Syrup", price: 250, ingredients: ["Water", "Syrup", "Sweetener"]},
        {type: "Drink", name: "Red Wine", price: 500, ingredients: ["Red Grapes"]},
        {type: "Drink", name: "Wine", price: 500, ingredients: ["Grapes"]},
        {type: "Food", name: "Goulash", price: 1500, ingredients: ["Carrot", "Paprika", "Meat", "Noodles"]},
        {
            type: "Food",
            name: "Grilled Chicken Breasts in Sweet&Spicy coat with Salad",
            price: 2000,
            ingredients: ["Chicken Breasts", "Seasoning", "Home Made Salad"]
        },
        {
            type: "Food",
            name: "Dobos Cake",
            price: 900,
            ingredients: ["Flour", "Burnt Sugar", "Margarine", "Nuts"]
        }
    ];

    foods.forEach((item) => {
        Food.create({ //Add item to db
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
    let ordersFood;
    let price = 0;
    orders.forEach(function (item) {
        ordersFood = item['foods'];
        price = getTotalPrice(ordersFood);

        Order.create({ //Add item to db
            _id: new mongoose.Types.ObjectId(),
            status: item['status'],
            fulfilled: item['fulfilled'],
            received: item['received'],
            foods: ordersFood,
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
    res.status(200).send("Database Initialized");
});

module.exports = router;