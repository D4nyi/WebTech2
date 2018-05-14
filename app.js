var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var foodEndPoint = require('./routes/FoodEndPoint');
var costumerEndPoint = require('./routes/CostumerEndPoint');
var bartenderEndPoint = require('./routes/BartenderEndPoint');
var orderEndPoint = require('./routes/OrderEndPoint');
var managerEndPoint = require('./routes/ManagerEndPoint');
var initdb = require('./routes/FillDataBase');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));


app.use('/initdb', initdb);
app.use('/manager', managerEndPoint);
app.use('/food', foodEndPoint);
app.use('/bar', bartenderEndPoint);
app.use('/costumer', costumerEndPoint);
app.use('/order', orderEndPoint);


app.listen(8080, function () {
    console.log("Server listens on 8080.")
});