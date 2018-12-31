'use-strict';
const mongoose = require('mongoose');
const ValidationContract = require('./../validations/validations');
const repository = require('./../repositories/product-repository');
const azure = require('azure-storage');
const config = require('./../config');
const guid = require('guid');

const Product = mongoose.model('Product');

exports.index = async (req, res, next) => {
    try {
        let data = await repository.index()
        res.send(data).status(200);
    } catch (e) {
        res.status(500).send(e);
    };
}

exports.show = async (req, res, next) => {
    try {
        let data = await repository.show(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send(e);
    };
};

exports.showByTag = async (req, res, next) => {
    try {
        let data = await repository.showByTag(req.params.tags);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send(e);
    };
};

exports.showBySlug = async (req, res, next) => {
    try {
        let data = await repository.showBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send(e);
    };
};

exports.create = async (req, res, next) => {

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    };

    try {
        // create a blob service
        const blobSvc = azure.createBlobService(config.containerConnectionString);
        let filename = guid.raw().toString() + '.jpg';
        let rawdata = req.body.image;
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2], 'base64');

        // Save a image
        await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
            contentType: type
        }, function (error, result, response) {
            if (error) {
                filename = 'default-product.png';
            };
        });

        let data = await repository.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            active: true,
            tags: req.body.tags,
            image: global.IMAGEURL + '/product-images/' + filename,
        });
        res.status(201).send(data);
    } catch (e) {
        res.status(500).send(e);
    };
};

exports.update = async (req, res, next) => {
    try {
        let data = await repository.update(req.params.id, req.body);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send(e);
    };
};

exports.destroy = async (req, res, next) => {
    try {
        await repository.destroy(req.params.id);
        res.status(202).send({
            msg: "Product deleted successfully"
        });
    } catch (e) {
        res.status(500).send(e);
    };
};

exports.changeStatus = async (req, res, next) => {
    try {
        let data = await repository.changeStatus(req.params.id, req.body.active);
        res.status(200).send({
            active: data.active
        });
    } catch (e) {
        res.status(500).send(e);
    };
};