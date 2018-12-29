'use strict';

const mongoose = require('mongoose');
const Customer = require('./../models/customer');

exports.index = async (req, res, next) => {
    let data = await Customer.find();
    return data;
};


exports.create = async (customer) => {
    let data = await Customer.create(customer);
    return data;
};