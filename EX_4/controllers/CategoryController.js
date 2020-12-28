const db = require("../data/dataIndex");
const Category = db.categories;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const category = {
        title: req.body.name
    };

    Category.create(category).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error ocurred while creating the Category."
        });
    });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? {
        name: {
            [Op.like]: `%${name}$%`
        }
    } : null;

    Category.findAll({ where: condition }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error ocurred while getting all the Category."
        });
    });

};

exports.findOneById = (req, res) => {
    const id = req.params.id;

    Category.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Category with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Category.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Category with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Category.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Category with id=" + id
            });
        });
};

// exports.findAllPublished = (req, res) => {
//     Category.findAll({ where: { published: true } })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving tutorials."
//             });
//         });
// };