'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    number: {
        type: String,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    itens: [{
        quantity: {
            type: Number,
            require: true,
            default: 1
        },
        price:{
            type: Number,
            require: true
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }]

});

module.exports = mongoose.model('Order', schema);