const express = require('express');
const router = express.Router();
const productController = require('./../controllers/product-controller');

router.get('/', productController.index);

router.get('/admin/:id', productController.show);

router.get('/:slug', productController.showBySlug);

router.post('/', productController.create);

router.put('/:id', productController.update);

router.delete('/', productController.destroy);

router.get('/tags/:tags', productController.showByTag)


module.exports = router;