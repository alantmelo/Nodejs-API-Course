const express = require('express');
const router = express.Router();
const customerController = require('./../controllers/customer-controller');
const auth = require('./../services/auth-service');

router.get('/',customerController.index);
router.post('/', customerController.create);
router.post('/authenticate', customerController.authenticate);
router.post('/refresh-token', auth.authorize, customerController.refreshToken);


module.exports = router;