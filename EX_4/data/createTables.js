// const { seq } = require("async");
// const Sequelize = require("sequelize");
// const sequelize = require("../config/sequelize");

// const { Sequelize } = require("sequelize/types");

// module.exports = sequelize.define("category", {
//     category_id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     category_name: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     }
// });

module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
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
    }, {
        timestamps: false
    });

    return Category;
};


// https://www.youtube.com/watch?v=pxo7L5nd1gA