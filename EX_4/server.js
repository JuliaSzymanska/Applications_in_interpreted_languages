/*jshint esversion: 6 */
const db = require("./data/dataIndex");
db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => { console.log("Drop and re-sync db."); }).catch(err => {
    const log = require('log-to-file');
    log("Error in server.js", "myLogs.log");
});


const app = require('./app');

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
    console.log(`Product service is listening on
    ${server.address().port}`);
});