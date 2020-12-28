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
    // if (!req.body.product_name) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }



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