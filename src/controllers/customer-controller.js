'use strict';

const mongoose = require('mongoose');
const respository = require('./../repositories/customer-repository');
const ValidationContract = require('./../validations/validations');
const md5 = require('md5');
const oneSignal = require('./../services/pushnotification');
const email = require('./../services/email-service');
const Customer = mongoose.model('Customer');
const auth = require('./../services/auth-service');

exports.index = async (req, res, next) => {
    try {
        let data = await respository.index();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.create = async (req, res, next) => {

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'Name is too short');
    contract.isEmail(req.body.email, 'Invalid E-mail');
    contract.hasMinLen(req.body.password, 6, 'Password is too short');

    if (!contract.isValid) {
        res.status(400).send(contract.errors()).end();
        return;
    };

    try {
        let data = await respository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        email.send(req.body.email, 'Welcome', global.EMAIL_TMPL.replace('{0}', req.body.name))

        oneSignal.sendNotification(req.body);

        res.status(201).send(data);
    } catch (e) {
        res.status(500).send(e);
    };
};

exports.authenticate = async (req, res, next) => {
    // add contract
    try {

        let customer = await respository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(404).send({
                'message': 'User or password invalid'
            });
            return;
        }

        const token = await auth.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name
        });

        res.status(200).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });


    } catch (e) {
        res.status(401).send(e);
    }
};