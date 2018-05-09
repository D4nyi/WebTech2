const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const foodQueryEndPoint = require('./routes/FoodEndPoint');
const costumerQueryEndPoint = require('./routes/CostumerEndPoint');
const bartenderQueryEndPoint = require('./routes/BartenderEndPoint');
const orderQueryEndPoint = require('./routes/OrderEndPoint');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));


app.use('/food', foodQueryEndPoint);
app.use('/bar', bartenderQueryEndPoint);
app.use('/costumer', costumerQueryEndPoint);
app.use('/order', orderQueryEndPoint);


app.listen(8080, function () {
    console.log("Server listens on 8080.")
});