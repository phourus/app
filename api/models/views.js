var types = require('sequelize');
var db = require('../db');

module.exports = db.define('views', {
  id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
  ip: types.STRING(20),
  path: types.STRING,
  location: types.STRING,
  referer: types.STRING,
  exit: types.STRING
}, {
  classMethods: {
    collection: function (params) {
      return this.findAndCountAll(this.queryize(params));
    },
    add: function (model) {
      var execute = false;
      var query = {where: {viewerId: model.viewerId}};
      if (model.hasOwnProperty('postId')) {
        execute = true;
        query.where.postId = model.postId;
      }
      if (!execute) {
        return new Promise(function (resolve, reject) {
          resolve(true);
        });
      }
      return this.find(query)
      .then(function (data) {
        if (!data) {
          return this.create(model);
        }
      });
    },
    queryize: function (params) {
      if (params.post_id) {
          return {where: {postId: params.post_id}};
      }
      return {};
    }
  }
});
