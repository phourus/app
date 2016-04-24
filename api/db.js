var config = require("../config").get('db');
var Sequelize = require('sequelize');
var db = 'staging';
var username = 'phourus';
var password = 'o5F2jJZHmAIr';
var config = {
    host: 'staging.c27rpgejeaxu.us-west-2.rds.amazonaws.com',
    dialect: 'mariadb'
};

module.exports = new Sequelize(db, username, password, config);
