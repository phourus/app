var http = require('../lib/xhr');
var base = '/rest/members/';

module.exports = {
  collection: function (params) {
    var query = '';
    if (params.orgId) {
      query = '?orgId=' + params.orgId;
    }
    if (params.userId) {
      query = '?userId=' + params.userId;
    }
    return http.get(base + query);
  },
  request: function (orgId) {
    var model = {
      orgId: orgId
    };
    return http.post(base, model);
  },
  approve: function (id) {
    var model = {
      approved: 1
    };
    return http.put(base + id, model);
  },
  admin: function (id) {
    var model = {
      approved: 1,
      admin: 1
    };
    return http.put(base + id, model);
  },
  revoke: function (id) {
    var model = {
      admin: 0
    };
    return http.put(base + id, model);
  },
  deny: function (id) {
    return http.del(base + id);
  },
  remove: function (orgId) {
    return http.del(base + orgId);
  }
};
