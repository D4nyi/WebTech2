const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const foodQueryEndPoint = require('./routes/FoodQueryEndPoint');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));


app.use('/', foodQueryEndPoint);

app.listen(8080, function () {
    console.log("Server listens on 8080.")
});