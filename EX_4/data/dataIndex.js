/*jshint esversion: 6 */
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize.query('SELECT * FROM categories').then((tableObj) => {
    const log = require('log-to-file');
    log(JSON.stringify(tableObj), "myLogs.log");
})
    .catch((err) => {
        log('showAllSchemas ERROR' + err, "myLogs.log");
    });


db.sequelize.query(`SELECT * FROM orders o where o.order_id = ${id}`).then((tableObj) => {
    const log = require('log-to-file');
    log(JSON.stringify(tableObj), "myLogs.log");
})
    .catch((err) => {
        log('showAllSchemas ERROR' + err, "myLogs.log");
    });


// db.categories = require("./createTableCategories.js")(sequelize, Sequelize);
// db.products = require("./createTableProducts.js")(sequelize, Sequelize);
// db.products.belongsTo(db.categories, { foreignKey: 'category_id' });
// db.states = require("./createTableStates.js")(sequelize, Sequelize);
// db.orders = require("./createTableOrders.js")(sequelize, Sequelize);
// db.orders.belongsTo(db.states, { foreignKey: 'status_id' });
// db.products_for_orders = require("./createTableProductsForOrders.js")(sequelize, Sequelize);
// db.products_for_orders.belongsTo(db.orders, { foreignKey: 'order_id' });
// db.products_for_orders.belongsTo(db.products, { foreignKey: 'product_id' });

module.exports = db;