/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();

const indexController = require('../controllers/IndexController');
const categoriesController = require('../controllers/CategoriesController');
const productsController = require('../controllers/ProductsController');
const ordersController = require('../controllers/OrdersController');
const statesController = require('../controllers/StatesController');

router.get('/', indexController.home);

//* Products
router.get('/products', productsController.findAll);
router.get('/products/:id', productsController.findById);
router.post('/products', productsController.create);
router.put('/products/:id', productsController.update);

//* Categories
router.get('/categories', categoriesController.findAll);

//* Orders
router.get('/orders', ordersController.findAll);
router.get('/orders/:id', ordersController.findById);
router.get('/orders/name/:buyer_login', ordersController.findByName);
router.put('/orders/:id/:status', ordersController.update);
router.post('/orders', ordersController.create);
router.get('/orders/status/:status', ordersController.findByStatus);

//* States
router.get('/states', statesController.findAll);


module.exports = router;