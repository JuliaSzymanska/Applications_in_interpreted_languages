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

    Category.findByPk(product.category_id)
        .then(data => {
            if (data === null) {
                res.status(400).send({
                    message: "Product category has to reffer to an existing category"
                });
            } else {
                Products.create(product).then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Error ocurred while creating the Category."
                    });
                });
            }
        }).catch(err => {
            res.status(400).send({
                message: err.message || "Error ocurred while finding by pk in category create."
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
    };

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

    Category.findByPk(product.category_id)
        .then(data => {
            if (data === null) {
                res.status(400).send({
                    message: "Product category has to reffer to an existing category"
                });
            } else {
                Products.update(
                        product, {
                            where: {
                                product_id: req.params.id
                            }
                        }
                    )
                    .then(num => {
                        if (num == 1) {
                            res.status(200).send({
                                message: "Products was updated successfully."
                            });
                        } else if (num < 1) {
                            res.status(404).send({
                                message: `Cannot update Products with id=${id}. Maybe Products was not found or req.body is empty!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(400).send({
                            message: "Error updating Products with id=" + id
                        });
                    });
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error ocurred while finding pk for catgory in product controler update"
            });
        });
};