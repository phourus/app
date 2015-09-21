var types = require('sequelize');
var db = require('../db');

var teammates = db.define('teammates', {
  id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
  userId: types.INTEGER
}, {
  classMethods: {
  }
});

module.exports = teammates;
