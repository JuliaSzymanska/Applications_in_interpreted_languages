const express = require('express');
const router = express.Router();

const indexController = require('../controllers/IndexController');
const categoriesController = require('../controllers/CategoriesController');
const productsController = require('../controllers/ProductsController');

router.get('/', indexController.home);

//Products
router.get('/products', productsController.findAll);
router.get('/products/:id', productsController.findById);
router.post('/products', productsController.create);
//TODO: to nie dziala chyba
router.put('/products/:id', productsController.update);

//Categories
router.get('/categories', categoriesController.findAll);

//Orders

module.exports = router