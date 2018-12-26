'use-strict';
const mongoose = require('mongoose');
const ValidationContract = require('./../validations/validations');
const repository = require('./../repositories/product-repository');

const Product = mongoose.model('Product');

exports.index = (req, res, next) => {
    repository.index()
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.show = (req, res, next) => {
    repository.show(req.params.id)
        .then(data => res.status(200).send(data))
        .catch(e => res.status(400).send(e));
};

exports.create = (req, res, next) => {

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository.create(req.body).then(data => {
        return res.status(201).send(data);
    }).catch(e => {
        return res.status(400).send(e);
    });
}

exports.update = (req, res, next) => {
    repository.update(req.params.id, req.body)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        })
};

exports.destroy = (req, res, next) => {
    repository.destroy(req.body.id).then(function (data) {
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
    repository.showBySlug(req.params.slug).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    })
};

exports.showByTag = (req, res, next) => {
    repository.showByTag(req.params.tags)
        .then(data => res.status(200).send(data))
        .catch(e => res.status(200).send(e))
};


exports.changeStatus = (req, res, next) => {
    repository.changeStatus(req.params.id, req.body.active).then(data =>{
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}