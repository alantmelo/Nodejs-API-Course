'use strict';

const express = require('express');
const router = express.Router();
const auth = require('./../services/auth-service');

const orderController = require('./../controllers/order-controller');

router.get('/', orderController.index);
router.post('/', auth.authorize, orderController.create);

module.exports = router;