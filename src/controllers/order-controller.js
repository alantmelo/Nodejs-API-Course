'use strict';
const repository = require('./../repositories/order-repository');
const guid = require('guid');
const auth = require('./../services/auth-service')

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

        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await auth.decodeToken(token);

        let order = await repository.create({
            customer: data.id,
            number: guid.raw().substring(0, 6),
            itens: req.body.itens
        });
        res.status(201).send({order});
    } catch (e) {
        res.status(500).send(e);
    };
};