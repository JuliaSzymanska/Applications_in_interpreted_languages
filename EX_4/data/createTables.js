const { seq } = require("async");
const Sequelize = require("sequelize");
const sequelize = require("../config/Sequelize");

module.exports = sequelize.define("category", {
    category_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    category_name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

// https://www.youtube.com/watch?v=pxo7L5nd1gA