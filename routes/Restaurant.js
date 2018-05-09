/*
 * Copyright (c) 2018.05.09. 11:08. Created by Dániel Szöllősi, IU4MA4
 */

const mongoose = require('mongoose');

const db = mongoose.createConnection('mongodb://localhost:27017/Restaurant', {autoIndex: true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('MongoDB is Open');
});

module.exports = db;