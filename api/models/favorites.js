var types = require('sequelize');
var db = require('../db');

var favorites = db.define('favorites', {
  id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
  targetId: types.INTEGER
}, {
  classMethods: {
  }
});

module.exports = favorites;
