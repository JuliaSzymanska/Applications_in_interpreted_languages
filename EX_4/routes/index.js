const express = require('express');
const router = express.Router();

const indexController = require('../controllers/IndexController');
const fineController = require('../controllers/Zbedne/fineController');
// const productsController = require('../controllers/ProductsController');
const categoryController = require('../controllers/CategoryController');
const productController = require('../controllers/ProductController');

router.get('/', indexController.home);
// router.get('/fine', fineController.home);

// router.get('/products', productsController.getAll);
// router.get('/products/:id', productsController.getById);
// router.post('/products', productsController.store);
// router.put('/products/:id', productsController.updateById);
// router.get('/greet/:greet/:name', fineController.greeting);
// router.get('/test', fineController.test);

router.get('/products', productController.findAll);
router.get('/products/:id', productController.findOneById);
router.post('/products', productController.create);
// to nie dziala chyba
router.put('/products/:id', productController.update);

router.get('/categories', categoryController.findAll);

module.exports = router