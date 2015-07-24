var http = require('../ajax')(window);
var config = require('../../config');
var base = config.get('url') + ':' + config.get('port') + '/rest/tags/';
var settings = {
  headers: {
    "Authorization": require('../token').get()
  },
  promise: true
}

module.exports = {
  collection: function (params) {
    return http.get(base, settings);
  },
  add: function (model) {
    return http.post(base, model, settings);
  },
  remove: function(id) {
    return http.delete(base + id, settings);
  }
};
