/*jshint esversion: 6 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index');
var cors = require('cors');

const app = express();
app.use(cors({
    origin: '*'
  }));

require("./data/dataIndex");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', routes);

module.exports = app;

// nodemon index.js