const express = require('express');
const router = express.Router();
const productController = require('./../controllers/product-controller');
const auth = require('./../services/auth-service');

router.get('/', productController.index);

router.get('/admin/:id', productController.show);

router.get('/:slug', productController.showBySlug);

router.post('/', auth.authorize, productController.create);

router.put('/:id', auth.authorize, productController.update);

router.delete('/', productController.destroy);

router.get('/tags/:tags', productController.showByTag);

router.patch('/:id', productController.changeStatus);


module.exports = router;