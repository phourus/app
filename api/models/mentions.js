var types = require('sequelize');
var db = require('../db');

var mentions = db.define('mentions', {
  id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true}
}, {
  classMethods: {
  }
});

module.exports = mentions;
