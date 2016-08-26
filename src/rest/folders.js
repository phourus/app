let w = require('window-or-global');
var http = require('../lib/xhr');
var base = '/rest/folders/';
var settings = require('../lib/settings');

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
    return http.del(base + id, settings());
  },
  folder: function (id, folderId, remove) {
    if (remove) {
      return http.del(base + folderId + '/' + id, settings());
    }
    return http.post(base + folderId + '/' + id, settings());
  }
};
