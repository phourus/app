var types = require('sequelize');
var db = require('../db');

module.exports = db.define('saved', {
    id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
    folderId: types.INTEGER
}, {
  classMethods: {
    single: function (id) {
      return this.findOne(id);
    },
    collection: function (params) {
      return this.findAll(this.queryize(params));
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
      if (params.post_id) {
        return {where: {postId: params.post_id}};
      }
      return {where: {id: 0}};
    }
  }
});
