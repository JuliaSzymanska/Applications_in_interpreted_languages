const db = require("../data/dataIndex");
const Orders = db.orders;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    Orders.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error ocurred while getting all the Orders."
        });
    });

};

exports.findById = (req, res) => {
    const id = req.params.id;
    Orders.findByPk(id)
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
    const buyer_login = req.query.buyer_login;
    var condition = buyer_login ? {
        buyer_login: {
            [Op.like]: buyer_login
        }
    } : null;

    Orders.findAll({ where: condition })
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

    Orders.update({ status_id: req.body.status_id }, {
            where: { order_id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Orders was updated successfully."
                });
            } else if (num < 1) {
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