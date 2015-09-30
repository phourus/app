var types = require('sequelize');
var db = require('../db');

var teams = db.define('teams', {
  id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
  name: types.STRING
}, {
  classMethods: {
  }
});

module.exports = teams;