var sql = require('sequelize');
var db = require('../db');

var search = db.define('search', {
  postSearch: {type: sql.STRING, defaultValue: ""},
  tagSearch: {type: sql.STRING, defaultValue: ""},
  linkSearch: {type: sql.STRING, defaultValue: ""},
  commentSearch: {type: sql.STRING, defaultValue: ""}
});

module.exports = search;
