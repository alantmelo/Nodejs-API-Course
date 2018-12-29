'use strict';
const repository = require('./../repositories/order-repository');
const guid = require('guid');

exports.index = async (req, res, next) => {
    try {
        let data = await repository.index();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send(e);
    };
};

exports.create = async (req, res, next) => {
    try {
        let data = await repository.create({
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            itens: req.body.itens
        });
        res.status(201).send({data});
    } catch (e) {
        res.status(500).send(e);
    };
};