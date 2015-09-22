var types = require('sequelize');
var db = require('../db');

var collaborators = db.define('collaborators', {
  id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
  teamId: types.INTEGER
}, {
  classMethods: {
  }
});

module.exports = collaborators;
