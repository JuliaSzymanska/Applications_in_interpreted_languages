const db = require("../data/dataIndex");
const Category = db.categories;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {

    Category.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error ocurred while getting all the Category."
        });
    });

};

// exports.delete = (req, res) => {
//     const id = req.params.id;

//     Category.destroy({
//             where: { id: id }
//         })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Category was deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete Category with id=" + id
//             });
//         });
// };

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