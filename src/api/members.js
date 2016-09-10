import * as http from '../lib/xhr'
let base = '/rest/members/';

export default {
  collection: function (params) {
    let query = '';
    if (params.orgId) {
      query = '?orgId=' + params.orgId;
    }
    if (params.userId) {
      query = '?userId=' + params.userId;
    }
    return http.get(base + query);
  },
  request: function (orgId) {
    let model = {
      orgId: orgId
    };
    return http.post(base, model);
  },
  approve: function (id) {
    let model = {
      approved: 1
    };
    return http.put(base + id, model);
  },
  admin: function (id) {
    let model = {
      approved: 1,
      admin: 1
    };
    return http.put(base + id, model);
  },
  revoke: function (id) {
    let model = {
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
