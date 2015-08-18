var http = require('../ajax')(window);
var base = '/rest/posts/';
var settings = require('../settings');

module.exports = {
  single: function (id) {
    return http.get(base + id, settings());
  },
  collection: function (params) {
    var _settings = settings();
    _settings.query = params;
    params.contextId = params.context.id;
    params.contextType = params.context.type;
    return http.get(base, _settings);
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
  account: function () {
    return http.get(base, settings());
  }
};
