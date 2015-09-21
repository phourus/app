var types = require('sequelize');
var db = require('../db');

var votes = db.define('votes', {
  id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
  option: types.STRING
}, {
  classMethods: {
  }
});

module.exports = votes;
