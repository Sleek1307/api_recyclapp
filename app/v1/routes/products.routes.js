const express = require('express');
const { userSigned } = require('../../middlewares/auth.middlewares.js');
const { isAdmin } = require('../../policies/user.policies.js')
const { getProducts, getProduct, getCategories, getCategory, createProduct, createCategory, updateProduct, updateCategory } = require('../../controllers/product.controller');
const router = express.Router();

//Traer todos los productos
router.get('/products', userSigned, getProducts);
//Traer un producto
router.get('/products/:id', userSigned, getProduct);

//Traer todas las categorias
router.get('/categories', userSigned, getCategories);
//Traer una categoria
router.get('/categories/:id', userSigned, getCategory);

//Crear un producto
router.post('/product', userSigned, isAdmin, createProduct);
//Crear una categoria
router.post('/category', userSigned, isAdmin, createCategory);

//Actualizar un producto
router.put('/product/:id', userSigned, isAdmin, updateProduct);
//Actualizar una categoria
router.put('/category/:id', userSigned, isAdmin, updateCategory);

module.exports = router;