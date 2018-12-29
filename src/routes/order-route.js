'use strict';

const express = require('express');
const router = express.Router();

const orderController = require('./../controllers/order-controller');

router.get('/', orderController.index);
router.post('/', orderController.create);

module.exports = router;