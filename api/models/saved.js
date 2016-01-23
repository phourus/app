var types = require('sequelize');
var db = require('../db');

module.exports = db.define('saved', {
    id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
    folderId: types.INTEGER,
    postId: types.INTEGER
}, {
  classMethods: {
    add: function (postId, folderId) {
      let model = {
        postId: postId,
        folderId: folderId
      };
      return this.create(model);
    },
    remove: function (postId, folderId) {
      return this.destroy({where: {postId: postId, folderId: folderId}});
    },
  }
});
