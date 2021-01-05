/*jshint esversion: 6 */
const db = require("../data/dataIndex");

exports.findAll = (req, res) => {

    db.sequelize.query('SELECT * FROM CATEGORIES').then(data => {
        res.send(data);
    }).catch(err => {
        res.status(400).send({
            message: err.message || "Error ocurred while getting all the Category."
        });
    });

};