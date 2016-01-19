var types = require('sequelize');
var db = require('../db');

module.exports = db.define('folders', {
    id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
    parentId: {type: types.INTEGER, allowNull: false, default: 0},
    name: types.STRING(20)
}, {
  classMethods: {
    single: function (id) {
      return this.findOne(id);
    },
    collection: function (params) {
      return this.findAll({where: {userId: this.SESSION_USER}});
    },
    add: function (model) {
      model.userId = this.SESSION_USER;
      if (!model.parentId) {
        model.parentId = 0;
      }
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
