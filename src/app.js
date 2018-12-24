'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://xxxx:xxxxx@ds045077.mlab.com:45077/nodejsbalto', { useNewUrlParser: true })
mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Load Models
const Product = require('./models/product');

// Load Routes
const indexRoute = require('./../src/routes/index-router');
const productRoute = require('./../src/routes/product-route');

app.use('/', indexRoute);
app.use('/products', productRoute);


module.exports = app;