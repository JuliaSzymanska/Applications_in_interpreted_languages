const { request } = require('../app');
const products = require('../data/ProductData');
const _ = require('underscore');

exports.getAll = (req, res) => {
    res.json(products);
};

exports.getById = (req, res) => {
    res.json(_.find(products, function(product) { return product.id == req.params.id }));
};

exports.store = (req, res) => {
    let newProduct = {
        'id': products.length + 1,
        'name': req.body.name,
        'description': req.body.description,
        'price': req.body.price,
        'amount': req.body.amount,
    }

    products.push(newProduct);
    res.json({
        'status': 'saved',
        'product': newProduct,
    })

}

exports.updateById = (req, res) => {
    const currentProduct = _.find(products, function(product) { return product.id == req.params.id });
    currentProduct.name = req.body.name;
    currentProduct.description = req.body.description;
    currentProduct.price = req.body.price;
    currentProduct.amount = req.body.amount;
    res.json({
        'updatedProduct': currentProduct
    })
}