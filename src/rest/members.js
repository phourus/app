var http = require('../ajax')(window);
var base = '/rest/members/';
var settings = require('../settings');

module.exports = {
  collection: function (params) {
    var query = '';
    if (params.orgId) {
      query = '?orgId=' + params.orgId;
    }
    if (params.userId) {
      query = '?userId=' + params.userId;
    }
    return http.get(base + query, settings());
  },
  request: function (orgId) {
    var model = {
      orgId: orgId
    };
    return http.post(base, model, settings());
  },
  approve: function (id) {
    var model = {
      approved: 1
    };
    return http.put(base + id, model, settings());
  },
  admin: function (id) {
    var model = {
      approved: 1,
      admin: 1
    };
    return http.put(base + id, model, settings());
  },
  revoke: function (id) {
    var model = {
      admin: 0
    };
    return http.put(base + id, model, settings());
  },
  deny: function (id) {
    return http.delete(base + id, settings());
  }
};
