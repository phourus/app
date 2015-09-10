var types = require('sequelize');
var db = require('../db');

module.exports = db.define('thumbs', {
  id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
  positive: types.BOOLEAN
}, {
  classMethods: {
    single: function (params) {
      return this.findOne({where: {postId: params.postId, userId: params.userId}});
    },
    collection: function (params) {
      return this.findAndCountAll(this.queryize(params));
    },
    add: function (model) {
      return this.create(model);
    },
    save: function (id, model) {
      return this.update(model, {where: {id: id, userId: model.userId}});
    },
    remove: function (id, userId) {
      return this.destroy({where: {id: id, userId: userId}});
    },
    queryize: function (params) {
      // default to zero comments otherwise missing params will get all
      var query = {
        where: {
          id: 0
        }
      };
      if (params.postId) {
        query.where = {
          postId: params.postId
        }
      }
      return query;
    }
  }
});
