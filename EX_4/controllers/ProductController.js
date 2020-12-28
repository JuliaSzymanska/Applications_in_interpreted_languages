const db = require("../data/dataIndex");
const Products = db.products;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    Products.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error ocurred while getting all the Products."
        });
    });

};

exports.findOneById = (req, res) => {
    const id = req.params.id;
    Products.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Products with id=" + id
            });
        });
};

exports.create = (req, res) => {
    if (!req.body.product_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const product = {
        product_name: req.body.product_name,
        description: req.body.description,
        unit_price: req.body.unit_price,
        unit_weight: req.body.unit_weight,
        category_id: req.body.category_id,
    };

    Products.create(product).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error ocurred while creating the Category."
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Products.update(req.body, {
            where: { product_id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Products was updated successfully."
                });
            } else if (num < 1) {
                res.send({
                    message: `Cannot update Products with id=${id}. Maybe Products was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Products with id=" + id
            });
        });
};