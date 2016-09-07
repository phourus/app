import http from '../lib/xhr';
var base = '/rest/collaborators/';

export default {
  collection: function (postId) {
    return http.get(base + postId);
  },
  add: function (model) {
    return http.post(base, model);
  },
  remove: function(type, id) {
    return http.del(base + type + '/' + id);
  },
  lookup: function (orgId) {
    return http.get(base + 'lookup/' + orgId);
  }
};
