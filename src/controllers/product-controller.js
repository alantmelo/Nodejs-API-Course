'use-strict';
const mongoose = require('mongoose');
const ValidationContract = require('./../validations/validations');

const Product = mongoose.model('Product');

exports.index = async (req, res, next) => {
    let products = await Product.find({
        active: true
    }, 'title slug price');
    return res.status(200).send(products);
}

exports.create = async (req, res, next) => {

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    let product = await Product.create(req.body).then(data=>{
        return res.status(201).send(data);
    }).catch(e =>{
        return res.status(400).send(e);
    });
}

exports.show = async(req, res, next) => {
    let product = await Product.findById(req.params.id)
    return res.send(product);
};

exports.update = async (req, res, next) => {
    let product = await Product.findOneAndUpdate(req.params.id, req.body, {
        new: true
    }).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e)
    })
};

exports.destroy = async (req, res, next) => {
    await Product.findOneAndRemove(req.body.id).then(function (data) {
        res.status(202).send({
            msg: "Product deleted successfully"
        })
    }).catch(function (e) {
        res.status(400).send({
            msg: e
        })
    })
}

exports.showBySlug = async (req, res, next) => {
    let product = await Product.findOne({
        slug: req.params.slug,
        active: true
    }, 'title description, slug, price, tags');
    return res.status(200).send(product);
}

exports.showByTag = async (req, res, next) => {
    let product = await Product.find({
        tags: req.params.tags
    })
    return res.status(200).send(product);
}