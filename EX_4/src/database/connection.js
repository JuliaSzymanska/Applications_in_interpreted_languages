const { seq } = require("async");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("Shop", 'loggin', '', { host: 'localhost', dialect: "mssql" });

module.exports = sequelize;
global.sequelize = sequelize;