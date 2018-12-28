'use strict';

const mongoose = require('mongoose');
const Product = require('./../models/product');

exports.index = async () => {
    let data = await Product.find({
        active: true,
    }, 'title price slug tags active');
    return data;
};

exports.show = async (id) => {
    let data = await Product.findById(id);
    return data;
};

exports.showByTag = async (tags) => {
    let data = await Product.find({
        tags: tags
    });
    return data;
};

exports.showBySlug = async (slug) => {
    let data = await Product.findOne({
        slug: slug,
        active: true
    }, 'title description slug price tags')
    return data;
};

exports.create = async (product) => {
    let data = await Product.create(product);
    return data;
};

exports.update = async (id, product) => {
    let data = await Product.findOneAndUpdate(id, product, {
        new: true
    });
    return data;
};

exports.destroy = async (id) => {
    return await Product.findOneAndRemove(id);
};

exports.changeStatus = async (id, data) => {
    return await Product.findOneAndUpdate(id, {
        $set: {
            active: data
        }
    }, {
        new: true
    })
}