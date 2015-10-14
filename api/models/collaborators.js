var types = require('sequelize');
var db = require('../db');

var collaborators = db.define('collaborators', {
  id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
  teamId: types.INTEGER
}, {
  classMethods: {
    collection: function (postId) {
      return this.findAll({where: {postId: postId}});
    },
    add: function (model) {
      return this.create(model);
    },
    remove: function (type, id) {
      var where;
      if (type === 'user') {
        where.userId = id;
      }
      if (type === 'team') {
        where.teamId = id;
      }
      if (!where) {
        return new Promise(function (reject, resolve) {
          reject();
        });
      }
      return this.destroy(where);
    },
    lookup: function (orgId) {
      return this.findAll({where: {id: 0}});
    }
  }
});

module.exports = collaborators;
