/*jshint esversion: 6 */
const { or } = require("sequelize");
const db = require("../data/dataIndex");

exports.findAll = (req, res) => {
    db.sequelize
        .query("SELECT * FROM orders")
        .then((orders) => {
            let newJSON = orders[0];
            db.sequelize.query(`SELECT * FROM products_for_orders `)
                .then((products) => {
                    let newProducts = products[0];
                    for (const i in newJSON) {
                        newJSON[i]["products"] = []
                    }
                    for (const product in newProducts) {
                        for (const i in newJSON) {
                            if (newJSON[i].order_id === newProducts[product].order_id) {
                                newJSON[i]["products"].push(newProducts[product]);
                            }
                        }
                    }
                    res.send(newJSON);
                }
                )
                .catch((e) => {
                    res.status(400).send({
                        message: e + "Error adding products to order",
                    });
                });
        })
        .catch((err) => {
            res.status(400).send({
                message: err.message || "Error ocurred while getting all the Orders.",
            });
        });
};


exports.findById = (req, res) => {
    const id = req.params.id;

    if (!id || id === "") {
        res.status(400).send({
            message: "ID can not be empty!",
        });
        return;
    }

    db.sequelize
        .query(`SELECT * FROM orders o where o.order_id = ${id}`)
        .then((orders) => {
            let newJSON = orders[0];
            db.sequelize.query(`SELECT * FROM products_for_orders `)
                .then((products) => {
                    let newProducts = products[0];
                    for (const i in newJSON) {
                        newJSON[i]["products"] = []
                    }
                    for (const product in newProducts) {
                        for (const i in newJSON) {
                            if (newJSON[i].order_id === newProducts[product].order_id) {
                                newJSON[i]["products"].push(newProducts[product]);
                            }
                        }
                    }
                    res.send(newJSON);
                }
                )
                .catch((e) => {
                    res.status(400).send({
                        message: e + "Error adding products to order",
                    });
                });
        })
        .catch((err) => {
            res.status(400).send({
                message: err + " Error retrieving Orders with id=" + id,
            });
        });
};

exports.findByName = (req, res) => {
    const buyer_login = req.params.buyer_login;

    if (!buyer_login || buyer_login === "") {
        res.status(400).send({
            message: "Buyer login can not be empty!",
        });
        return;
    }

    db.sequelize
        .query(`SELECT * FROM orders o where o.buyer_login = '${buyer_login}'`)
        .then((orders) => {
            let newJSON = orders[0];
            db.sequelize.query(`SELECT * FROM products_for_orders `)
                .then((products) => {
                    let newProducts = products[0];
                    for (const i in newJSON) {
                        newJSON[i]["products"] = []
                    }
                    for (const product in newProducts) {
                        for (const i in newJSON) {
                            if (newJSON[i].order_id === newProducts[product].order_id) {
                                newJSON[i]["products"].push(newProducts[product]);
                            }
                        }
                    }
                    res.send(newJSON);
                }
                )
                .catch((e) => {
                    res.status(400).send({
                        message: e + "Error adding products to order",
                    });
                });
        })
        .catch((err) => {
            res.status(400).send({
                message: err.message || "Error retrieving order by buyer login",
            });
        });
};

exports.findByStatus = (req, res) => {
    const status = req.params.status;

    db.sequelize
        .query(`SELECT * FROM orders o where o.status_id = '${status}'`)
        .then((orders) => {
            let newJSON = orders[0];
            db.sequelize.query(`SELECT * FROM products_for_orders `)
                .then((products) => {
                    let newProducts = products[0];
                    for (const i in newJSON) {
                        newJSON[i]["products"] = []
                    }
                    for (const product in newProducts) {
                        for (const i in newJSON) {
                            if (newJSON[i].order_id === newProducts[product].order_id) {
                                newJSON[i]["products"].push(newProducts[product]);
                            }
                        }
                    }
                    res.send(newJSON);
                }
                )
                .catch((e) => {
                    res.status(400).send({
                        message: e + "Error adding products to order",
                    });
                });
        })
        .catch((err) => {
            res.status(400).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving order by status.",
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    if (!id || id === "") {
        res.status(400).send({
            message: "ID can not be empty!",
        });
        return;
    }

    if (!req.params.status || req.params.status === "") {
        res.status(400).send({
            message: "Status can not be empty!",
        });
        return;
    }

    db.sequelize
        .query(`SELECT s.status_id from orders s where s.order_id = ${id}`)
        .then((value) => {
            value = JSON.stringify(value[0][0].status_id);
            // const log = require('log-to-file');
            // log(value, "myLogs.log");
            if (value == 2 || value >= req.params.status) {
                res.status(400).send({
                    message: "Unable to set this status",
                });
            } else {
                db.sequelize
                    .query(`UPDATE orders SET status_id = ${req.params.status}
                            where order_id = ${id}`)
                    .then((num) => {
                        if (num[1] == 1) {
                            res.send({
                                message: "Orders was updated successfully.",
                            });
                        } else {
                            res.send({
                                message: `
                            Cannot update Orders with id = ${id}.Maybe Orders was not found or req.body is empty!`,
                            });
                        }
                    })
                    .catch((err) => {
                        res.status(400).send({
                            message: "Error updating Orders with id=" + id,
                        });
                    });
            }
        });
};

exports.create = (req, res) => {
    if (
        !req.body.buyer_login ||
        !req.body.buyer_email ||
        !req.body.status_id ||
        !req.body.buyer_phone_number ||
        !req.body.approval_date ||
        !req.body.products ||
        req.body.buyer_login == "" ||
        req.body.buyer_email == "" ||
        req.body.status_id == "" ||
        req.body.buyer_phone_number == "" ||
        req.body.buyer_phone_number == ""
    ) {
        res.status(400).send({
            message: "Contents can not be empty!",
        });
        return;
    }

    const order = {
        approval_date: req.body.approval_date,
        buyer_login: req.body.buyer_login,
        buyer_email: req.body.buyer_email,
        buyer_phone_number: req.body.buyer_phone_number,
        status_id: req.body.status_id,
        products: req.body.products,
    };

    for (const i in order.products) {
        if (order.products[i].numberOfItems <= 0) {
            res.status(400).send({
                message: "Product amount must be greater than 0",
            });
        }
    }

    db.sequelize
        .query(
            `INSERT INTO orders 
    (approval_date, status_id, buyer_login, buyer_email, buyer_phone_number)
    values( '${order.approval_date}', 
             ${order.status_id}, 
            '${order.buyer_login}', 
            '${order.buyer_email}', 
            '${order.buyer_phone_number}')`
        )
        .then((data) => {
            db.sequelize.query(`SELECT @@IDENTITY`).then((data2) => {
                let insertedOrderId = JSON.stringify(data2[0][0][""]);

                productsToInsertLoop(insertedOrderId, order)
                    .then(() => {
                        res.send({ message: "Order was created successfully." });
                    })
                    .catch((e) => {
                        res.status(400).send({
                            message: "Error adding products to order",
                        });
                    });
            });
        })
        .catch((e) => {
            res.status(400).send({
                message: "Error creating order",
            });
        });
};

function productsToInsertLoop(insertedOrderId, order) {
    const promises = [];

    for (const i in order.products) {
        promises.push(
            db.sequelize
                .query(`INSERT INTO products_for_orders (order_id, product_id, number_of_items)
        values( ${insertedOrderId}, 
                ${order.products[i].productId},
                ${order.products[i].numberOfItems})`)
        );
    }

    return Promise.all(promises);
}
