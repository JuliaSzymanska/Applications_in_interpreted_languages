//ADD CONSTRAINT number_of_items_greater CHECK(number_of_items > 0),

module.exports = (sequelize, Sequelize) => {
    const Products_for_order = sequelize.define("products_for_order", {
        order_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        product_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        number_of_items: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: false
    });

    return Products_for_order;
};