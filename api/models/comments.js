var types = require('sequelize');
var db = require('../db');

var comments = db.define('comments', {
  id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
  content: types.TEXT
}, {
  classMethods: {
    collection: function (params) {
      return this.findAndCountAll(this.queryize(params));
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
      // to avoid cyclical dependency, require as needed
      var users = require('./users');
      return {where: {postId: params.post_id}, include: [{model: users, as: 'user'}]};
    }
  }
});

module.exports = comments;
