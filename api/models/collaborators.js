var types = require('sequelize');
var db = require('../db');

var members = require('./members');
var teams = require('./teams');
var users = require('./users');

var collaborators = db.define('collaborators', {
  id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true}
}, {
  classMethods: {
    collection: function (postId) {
      return this.findAll({where: {postId: postId}, include: [users, teams]});
    },
    add: function (model) {
      return this.create(model);
    },
    remove: function (type, id) {
      var where = {};
      var valid = false;
      if (type === 'user') {
        valid = true;
        where.userId = id;
      }
      if (type === 'team') {
        valid = true;
        where.teamId = id;
      }
      if (!valid) {
        return new Promise(function (reject, resolve) {
          reject();
        });
      }
      return this.destroy({where: where});
    },
    lookup: function (orgId) {
      return members.findAll({
        where: {orgId: orgId, approved: 1},
        include: [users]
      })
      .then(function (orgMembers) {
        return teams.findAll({where: {orgId: orgId}})
        .then(function (orgTeams) {
          return new Promise(function (resolve, reject) {
            var out = {
              members: orgMembers,
              teams: orgTeams
            };
            resolve(out);
          });
        });
      });
    }
  }
});

module.exports = collaborators;
