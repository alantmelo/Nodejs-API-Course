'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://admin:admin@ds045077.mlab.com:45077/nodejsbalto', {
    useNewUrlParser: true
});

mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Load Models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

// Load Routes
const indexRoute = require('./../src/routes/index-router');
const productRoute = require('./../src/routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route')

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);


module.exports = app;