/*jshint esversion: 6 */
const db = require("../data/dataIndex");
const States = db.states;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    States.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error ocurred while getting all the Category."
        });
    });
};