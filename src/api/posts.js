import * as http from '../lib/xhr'
let base = '/rest/posts/';

export default {
  single: function (id) {
    return http.get(base + id);
  },
  collection: function (params) {
    let query = params;
    params.contextId = params.context.id;
    params.contextType = params.context.type;
    return http.get(base);
  },
  add: function (model) {
    return http.post(base, model);
  },
  save: function (id, model) {
    return http.put(base + id, model);
  },
  remove: function(id) {
    return http.del(base + id);
  },
  account: function () {
    return http.get(base);
  },
  poll: function(id) {
    return http.get(base + id + '/poll');
  },
  vote: function (id, option) {
    return http.post(base + id + '/vote', {option: option});
  }
};
