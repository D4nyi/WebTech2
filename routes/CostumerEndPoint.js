const express = require('express');
const router = express.Router();
const Costumer = require('./Costumer');
const mongoose = require('mongoose');

//Initialize db
router.get('/filldb', (req, res) => {
    //Data to add
    const costumers = [
        {"name": "Kis Pista", "billing_address": "Mályinka Fő út 12."},
        {"name": "Horvát Rozi", "billing_address": "Miskolc vörösmarty utca 5."},
        {"name": "Urbán Gábor", "billing_address": "Nyiregyháza Kossuth út 33."},
        {"name": "Nagy Tamás", "billing_address": "Budapest Megyeri út 100."},
        {"name": "Kalla László", "billing_address": "Eger Tárkányi út 19."},
        {"name": "Farkas Máté", "billing_address": "Dunaújváros Határ út 35."},
        {"name": "Petróczki Zoltán", "billing_address": "Tiszaújváros Szent István út 20."}
    ];

    costumers.forEach((item) => {
        Costumer.create({ //Add item to db
            _id: new mongoose.Types.ObjectId(),
            name: item['type'],
            billing_address: item['billing_address']
        }, (err, doc) => { //Error Handler
            if (err !== null) {
                console.log("Hiba!" + err.toString());
                console.log(doc);
                return res.status(415).send(doc);
            }
        });
    });
    res.status(200).send("Costumers Inserted");
});

router.post("/add", (req, res) => {
    Costumer.create({ //Add item to db
        _id: new mongoose.Types.ObjectId(),
        name: req.body['name'],
        billing_address: req.body['billing_address']
    }, (err, doc) => {
        if (err !== null) { //Error Handler
            console.log("Hiba!" + err.toString());
            console.log(doc);
            res.status(415).send(doc);
        }
    });
});

module.exports = router;