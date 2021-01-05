/*jshint esversion: 6 */
const db = require("../data/dataIndex");

exports.findAll = (req, res) => {
    db.sequelize.query('SELECT * FROM orders').then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error ocurred while getting all the Orders."
        });
    });

};

db.sequelize.query('SELECT * FROM categories').then((tableObj) => {
        const log = require('log-to-file');
        log(JSON.stringify(tableObj), "myLogs.log");
    })
    .catch((err) => {
        log('showAllSchemas ERROR' + err, "myLogs.log");
    });


exports.findById = (req, res) => {
    const id = req.params.id;

    if (!id || id === "") {
        res.status(400).send({
            message: "ID can not be empty!"
        });
        return;
    }

    db.sequelize.query(`SELECT * FROM orders o where o.order_id = ${id}`)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Orders with id=" + id
            });
        });
};

exports.findByName = (req, res) => {
    const buyer_login = req.params.buyer_login;

    if (!buyer_login || buyer_login === "") {
        res.status(400).send({
            message: "Buyer login can not be empty!"
        });
        return;
    }


    db.sequelize.query(`SELECT * FROM orders o where o.buyer_login = '${buyer_login}'`)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

//TODO: z walidacją poprawności zmiany, np. nie można zrealizować anulowanego zamówienia i pewnie update tez nie dziala
exports.update = (req, res) => {
    const id = req.params.id;

    if (!id || id === "") {
        res.status(400).send({
            message: "ID can not be empty!"
        });
        return;
    }

    if (!req.params.status || req.params.status === "") {
        res.status(400).send({
            message: "Status can not be empty!"
        });
        return;
    }

    db.sequelize.query(`SELECT s.status_id from orders s where s.order_id = ${id}`).then(
        value => {
            if (value[0] >= req.params.status) {
                res.status(400).send({
                    message: "Unable to set this status"
                });
                return;
            }
        }
    )

    db.sequelize.query(`UPDATE orders SET status_id = ${req.params.status} where order_id = ${id}`)
        .then(num => {
            if (num[1] == 1) {
                res.send({
                    message: "Orders was updated successfully."
                });
            } else {
                res.send({
                    message: `
                    Cannot update Orders with id = $ { id }.Maybe Orders was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Orders with id=" + id
            });
        });
};


//TODO: dodawanie produktow zamowionych
exports.create = (req, res) => {
    if (!req.body.buyer_login || !req.body.buyer_email || !req.body.status_id || !req.body.buyer_phone_number || !req.body.approval_date ||
        req.body.buyer_login == "" || req.body.buyer_email == "" || req.body.status_id == "" || req.body.buyer_phone_number == "" || req.body.buyer_phone_number == "") {
        res.status(400).send({
            message: "Contents can not be empty!"
        });
        return;
    }

    // TODO cos mi tu nie pasuje

    const order = {
        approval_date: req.body.approval_date,
        buyer_login: req.body.buyer_login,
        buyer_email: req.body.buyer_email,
        buyer_phone_number: req.body.buyer_phone_number,
        status_id: req.body.status_id,
    };


    db.sequelize.query(`INSERT INTO orders 
    (approval_date, status_id, buyer_login, buyer_email, buyer_phone_number)
    values('${order.approval_date}', ${order.status_id}, '${order.buyer_login}', '${order.buyer_email}', '${order.buyer_phone_number}')`)
        .then(data => {
            res.send({ message: "Orders was created successfully." });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error ocurred while creating the Category."
            });
        });
};

exports.findByStatus = (req, res) => {
    const status = req.params.status;

    db.sequelize.query(`SELECT * FROM orders o where o.status_id = '${status}'`)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};