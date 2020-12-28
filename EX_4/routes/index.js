const express = require('express');
const router = express.Router();

const indexController = require('../controllers/IndexController');
const fineController = require('../controllers/fineController');
const productsController = require('../controllers/ProductsController');
const categoryController = require('../controllers/CategoryController');

router.get('/', indexController.home);
router.get('/fine', fineController.home);

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.getById);
router.post('/products', productsController.store);
router.put('/products/:id', productsController.updateById);
router.get('/greet/:greet/:name', fineController.greeting);
router.get('/test', fineController.test);
router.get('/getAll', categoryController.findAll);


module.exports = router