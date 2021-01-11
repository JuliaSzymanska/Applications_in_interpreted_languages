/*jshint esversion: 6 */
const db = require("../data/dataIndex");
const Products = db.products;
const Category = db.categories;

exports.findAll = (req, res) => {
    db.sequelize.query('SELECT * FROM products').then(data => {
        res.send(data);
    }).catch(err => {
        res.status(400).send({
            message: err.message || "Error ocurred while getting all the Products."
        });
    });
};

exports.findById = (req, res) => {
    const id = req.params.id;
    db.sequelize.query(`SELECT * FROM products p where p.product_id = ${id}`)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send({
                message: "Error retrieving Products with id=" + id
            });
        });
};

exports.findByCategory = (req, res) => {
    const category = req.params.category;
    db.sequelize.query(`SELECT * FROM products p where p.category_id = ${category}`)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send({
                message: "Error retrieving Products with id=" + id
            });
        });
};


exports.create = (req, res) => {
    const product = {
        product_name: req.body.product_name,
        description: req.body.description,
        unit_price: req.body.unit_price,
        unit_weight: req.body.unit_weight,
        category_id: req.body.category_id,
    };

    if (!product.product_name || product.product_name === "") {
        res.status(400).send({
            message: "Product name can not be empty!"
        });
        return;
    }

    if (!product.description || product.description === "") {
        res.status(400).send({
            message: "Product description can not be empty!"
        });
        return;
    }

    if (!product.unit_price || product.unit_price <= 0) {
        res.status(400).send({
            message: "Product price can not be empty and has to be a positive number"
        });
        return;
    }

    if (!product.unit_weight || product.unit_weight <= 0) {
        res.status(400).send({
            message: "Product weight can not be empty and has to be a positive number"
        });
        return;
    }

    // const log = require('log-to-file');
    // log(Category.findByPk(1), "myLogs.log");
    if (!product.category_id) {
        res.status(400).send({
            message: "Product category can not be empty"
        });
        return;
    }

    db.sequelize
        .query(
            `INSERT INTO products 
    (product_name, description, unit_price, unit_weight, category_id)
    values( '${product.product_name}', 
             '${product.description}', 
            ${product.unit_price}, 
            ${product.unit_weight}, 
            ${product.category_id})`
        ).then(() => {
            res.send({ message: "product was created successfully." });
        }).catch(err => {
            res.status(400).send({
                message: "Error creating product",
            });
        });
};


exports.update = (req, res) => {

    const product = {
        product_name: req.body.product_name,
        description: req.body.description,
        unit_price: req.body.unit_price,
        unit_weight: req.body.unit_weight,
        category_id: req.body.category_id,
        id: req.params.id
    };

    const log = require('log-to-file');
    log( req.body.product_name, "myLogs.log");

    const promises = [];

    if (product.product_name == "") {
        res.status(400).send({
            message: "Product name can not be empty!"
        });
        return;
    }

    if (product.description == "") {
        res.status(400).send({
            message: "Product description can not be empty!"
        });
        return;
    }

    if (product.unit_price <= 0) {
        res.status(400).send({
            message: "Product price has to be a positive number"
        });
        return;
    }

    if (product.unit_weight <= 0) {
        res.status(400).send({
            message: "Product weight has to be a positive number"
        });
        return;
    }

    if (!req.params.id) {
        res.status(400).send({
            message: "Product id is mandatory"
        });
        return;
    }

    if (product.category_id != "") {
        promises.push(db.sequelize.query(`UPDATE products set category_id = ${product.category_id} where product_id = ${product.id}`));
    }

    promises.push(db.sequelize.query(`UPDATE products set product_name = '${product.product_name}' where product_id = ${product.id}`));
    promises.push(db.sequelize.query(`UPDATE products set description = '${product.description}' where product_id = ${product.id}`));

    if (product.unit_price !== "") {
        promises.push(db.sequelize.query(`UPDATE products set unit_price = ${product.unit_price} where product_id = ${product.id}`));
    }

    if (product.unit_weight !== "") {
        promises.push(db.sequelize.query(`UPDATE products set unit_weight = ${product.unit_weight} where product_id = ${product.id}`));
    }


    Promise.all(promises).then(() => {
        res.send({ message: "Product was modified successfully." });
    })
        .catch((e) => {
            res.status(400).send({
                message: "Error modyfying product",
            });
        });


};