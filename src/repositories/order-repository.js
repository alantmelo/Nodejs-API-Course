const mongoose = require('mongoose');
const Order = require('./../models/order');

exports.index = async () => {
    let data = await Order.find({}).populate('customer', {
        '_id': 0,
        'password': 0,
        'roles': 0,
        'email': 0
    }).populate('itens.product', {});
    return data;
};


exports.create = async (order) => {
    let data = await Order.create(order);
    return data;
};