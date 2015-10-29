var sql = require('sequelize');
var db = require('../db');

var search = db.define('search', {
  postSearch: {type: sql.TEXT, defaultValue: "", allowNull: false},
  tagSearch: {type: sql.TEXT, defaultValue: "", allowNull: false},
  linkSearch: {type: sql.TEXT, defaultValue: "", allowNull: false},
  commentSearch: {type: sql.TEXT, defaultValue: "", allowNull: false}
});

module.exports = search;
