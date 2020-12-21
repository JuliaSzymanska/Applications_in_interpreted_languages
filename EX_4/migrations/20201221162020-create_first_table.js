'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        queryInterface.createTable("category", {
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
    },

    down: async(queryInterface, Sequelize) => {
        queryInterface.dropTable("category");
    }
};