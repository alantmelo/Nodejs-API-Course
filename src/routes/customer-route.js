const express = require('express');
const router = express.Router();
const customerController = require('./../controllers/customer-controller');

router.get('/',customerController.index);
router.post('/', customerController.create);
router.post('/authenticate', customerController.authenticate);


module.exports = router;