//ADD CONSTRIANT weight price grater than 0
module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        order_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        approval_date: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        buyer_login: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        buyer_email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        byuer_phone_number: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status_id: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false
    });

    return Order;
};