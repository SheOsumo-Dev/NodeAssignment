const express = require('express');
const path = require('path');
const router = express.Router();
const routDir =  require('../util/path');
const adminController = require('../controllers/admin')
const products = [];

router.get('/add-product',adminController.getAddProduct);


router.post('/add-product', adminController.postAddProduct);

router.get('/products', adminController.getProducts);

router.get('/edit-product/:productId',adminController.getEditProduct);

router.post('/edit-product',adminController.postEditProduct);

router.post('/delete-product',adminController.postDeleteProduct);

module.exports = router;
// exports.routes = router;
// exports.products = products;



