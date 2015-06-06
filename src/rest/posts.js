var http = require('../ajax')(window);
var config = require('../../config').get('rest');
var base = config.url + ':' + config.port + '/posts/';
var settings = {
  headers: {
    "Authorization": require('../token').get()
  },
  promise: true
}

module.exports = {
  single: function (id) {
    return http.get(base + id, settings);
  },
  collection: function (params) {
    return http.get(base, settings);
  },
  add: function (model) {
    return http.post(base, model, settings);
  },
  save: function (id, model) {
    return http.put(base + id, model, settings);
  },
  remove: function(id) {
    return http.delete(base + id, settings);
  },
  account: function () {
    return http.get(base, settings);
  }
};