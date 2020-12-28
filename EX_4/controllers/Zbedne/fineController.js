require('dotenv').config();

exports.home = (req, res) => {
    res.json({
        "Jak tam": "fine!"
    })
}

exports.greeting = (req, res) => {
    let greet = req.params.greet;
    let name = req.params.name;
    res.json({
        'greeting': greet + ' ' + name + '!',
    })
}

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'mssql',
    database: process.env.DATABASE,
});

exports.test = (req, res) => {
    var sequelize = new Sequelize();
    console.log('halko alko')
    sequelize
        .authenticate()
        .then(() => {

            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
}