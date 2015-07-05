var types = require('sequelize');
var db = require('../db');

var users = require('./users');
var orgs = require('./orgs');

var members = db.define('members', {
  id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
  admin: types.BOOLEAN,
  approved: types.BOOLEAN
}, {
  classMethods: {
    request: function (orgID) {
      var model = {
        userId: this.SESSION_USER,
        orgId: orgId
      }
      return this.create(model);
    },
    approve: function (id) {
      var model = {
        approved: 1
      }
      return this.update(model, {where: {id: id}});
    },
    admin: function (id, model) {
      var model = {
        admin: 1
      }
      return this.update(model, {where: {id: id}});
    },
    deny: function (id) {
      var model = {
        approved: -1
      }
      return this.update({where: {id: id}});
    },
    getMembers: function (orgId) {
      return this.findAll({
        where: {
          orgId: orgId
        },
        include: [
          //{model: users, as: 'users'}
        ]
      });
    },
    getOrgs: function (userId) {
      return this.findAll({
        where: {
          userId: userId
        },
        include: [
          {model: orgs, as: 'org'}
        ]
      });
    }
  }
});

// membership
orgs.hasMany(members);
members.belongsTo(orgs);
users.hasMany(members);
members.belongsTo(users);

module.exports = members;
