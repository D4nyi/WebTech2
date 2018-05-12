const express = require('express');
const router = express.Router();
const Bartender = require('./Bartender');
const mongoose = require('mongoose');

//Initialize db
router.get('/filldb', (req, res) => {
    //Data to add
    const bartenders = [
        {"name": "Bele Sándor"},
        {"name": "Tóth Melinda"},
        {"name": "Nagy Piroska"},
        {"name": "Megyeri József"},
        {"name": "Pénztáros Lőrincz"},
        {"name": "Kertész Ádám"},
        {"name": "Németh Ferenc"}
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
    res.status(200).send("Bartenders Inserted");
});

router.post("/add", (req, res) => {
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

module.exports = router;