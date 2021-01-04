const db = require("../data/dataIndex");
const Products = db.products;

exports.findAll = (req, res) => {
    Products.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error ocurred while getting all the Products."
        });
    });

};

exports.findById = (req, res) => {
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


    Products.create(product).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error ocurred while creating the Category."
        });
    });
};

//TODO: nie dziala chyba wiec poprawic
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