var http = require('../ajax')(window);
var base = '/rest/comments/';
var settings = require('../settings');

module.exports = {
  collection: function (params) {
    var query = "";
    if (params.post_id) {
      query += 'post_id=' + params.post_id;
    }
    if (params.user_id) {
      query += 'user_id=' + params.user_id;
    }
    return http.get(base + '?' + query, settings());
  }
};
