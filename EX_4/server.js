/*jshint esversion: 6 */
const db = require("./data/dataIndex");
db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => { console.log("Drop and re-sync db."); });

const app = require('./app');

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
    console.log(`Product service is listening on
    ${server.address().port}`);
});