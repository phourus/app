let w = require('window-or-global');
var http = require('../xhr')(w);
var base = '/rest/folders/';
var settings = require('../settings');

module.exports = {
  collection: function (params) {
    var query = "";
    if (params.postId) {
      query += 'postId=' + params.postId;
    }
    if (params.userId) {
      query += 'userId=' + params.userId;
    }
    return http.get(base + '?' + query, settings());
  },
  add: function (model) {
    return http.post(base, model, settings());
  },
  save: function (id, model) {
    return http.put(base + id, model, settings());
  },
  remove: function(id) {
    return http.delete(base + id, settings());
  },
  folder: function (id, folderId, remove) {
    if (remove) {
      return http.delete(base + folderId + '/' + id, settings());
    }
    return http.post(base + folderId + '/' + id, settings());
  }
};
