var types = require('sequelize');
var db = require('../db');

var teams = require('./teams');
var teammates = require('./teammates');

var orgs = db.define('orgs', {
  id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
  type: types.ENUM('company', 'school', 'government', 'group'),
  name: types.STRING(40),
  shortname: {type: types.STRING(20), unique: true},
  email: types.STRING(60),
  phone: types.STRING(20),
  fax: types.STRING(20),
  website: types.STRING(80),
  influence: types.INTEGER,
  img: types.STRING,
  people: types.INTEGER,
  about: types.TEXT,
  video: types.STRING,
  channel: types.STRING,
  contact: types.TEXT
}, {
  classMethods: {
    single: function (id) {
      return this.findOne({shortname: id});
    },
    collection: function (params) {
      return this.findAndCountAll(this.queryize(params));
    },
    lookup: function (name) {
      return this.findAll({
        where: {
          $or: [
            {name: {$like: name + '%'}},
            {shortname: {$like: name + '%'}}
          ]
        },
        attributes: ['id', 'name', 'shortname']
      })
    },
    add: function (model) {
      return this.create(model);
    },
    save: function (id, model) {
      return this.update(model, {where: {id: id}});
    },
    remove: function (id) {
      return this.destroy({where: {id: id}});
    },
    queryize: function (params) {
      return {};
    }
  }
});

// teams
orgs.hasMany(teams);
teams.belongsTo(orgs);

// teammates
teams.hasMany(teammates);
teammates.belongsTo(teams);

module.exports = orgs;
