//ADD CONSTRIANT weight price grater than 0
module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        product_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        product_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
        },
        unit_price: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        unit_weight: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        category_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: false
    });

    return Product;
};