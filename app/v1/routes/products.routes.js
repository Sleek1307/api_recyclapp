const express = require('express');
const { getProducts, getProduct, getCategories, getCategory, createProduct, createCategory, updateProduct, updateCategory } = require('../../controllers/product.controller');
const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProduct);

router.get('/products/categories', getCategories);
router.get('/products/categories/:id', getCategory);

router.post('/product', createProduct);
router.post('/product/category', createCategory);

router.put('/product/:id', updateProduct);
router.put('/category/:id', updateCategory);

module.exports = router;