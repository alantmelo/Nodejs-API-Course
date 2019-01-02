const express = require('express');
const router = express.Router();
const productController = require('./../controllers/product-controller');
const auth = require('./../services/auth-service');

router.get('/', productController.index);

router.get('/admin/:id', productController.show);

router.get('/:slug', productController.showBySlug);

router.post('/', auth.isAdmin, productController.create);

router.put('/:id', auth.isAdmin, productController.update);

router.delete('/', auth.isAdmin, productController.destroy);

router.get('/tags/:tags', productController.showByTag);

router.patch('/:id', auth.isAdmin, productController.changeStatus);


module.exports = router;