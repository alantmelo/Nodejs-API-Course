'use strict';

const mongoose = require('mongoose');
const Product = require('./../models/product');

exports.index = () => {
    return Product.find({
        active: true,
    }, 'title price slug tags active');
};

exports.showBySlug = (slug) => {
    return Product.findOne({
        slug: slug,
        active: true
    }, 'title description, slug, price, tags')
};

exports.show = (id) => {
    return Product.findById(id);
};


exports.showByTag = (tags) => {
    return Product.find({
        tags: tags
    });
};

exports.destroy = (id) => {
    return Product.findOneAndRemove(id);
};

exports.create = (data) => {
    let product = Product.create(data);
    return product;
}

exports.update = (id, data) => {
    return Product.findOneAndUpdate(id, data, {
        new: true
    })
};

exports.changeStatus = (id, data) => {
    return Product.findOneAndUpdate(id, {
        $set: {
            active: data
        }
    }, {
        new: true
    })
}