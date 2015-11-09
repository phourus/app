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
    request: function (orgId) {
      var model = {
        userId: this.SESSION_USER,
        orgId: orgId,
        approved: 0,
        admin: 0
      };
      return this.create(model);
    },
    save: function (id, model) {
      return this.update(model, {where: {id: id}});
    },
    remove: function (id) {
      return this.destroy({where: {id: id, userId: this.SESSION_USER}});
    },
    isMember: function (userId, orgId) {
      return this.findOne({where: {userId: userId, orgId: orgId, approved: 1}});
    },
    getMembers: function (orgId) {
      // return this.findAll({
      //   where: {
      //     orgId: orgId
      //   },
      //   // include: [
      //   //   {model: users, as: 'users'}
      //   // ]
      // });
      return db.query('SELECT *, members.id AS memberId FROM `members`, `users` WHERE members.orgId = ' + orgId +' AND members.userId = users.id;');
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
