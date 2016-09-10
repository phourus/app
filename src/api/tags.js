import * as http from '../lib/xhr'
let base = '/rest/tags/';

export default {
  collection: function (params) {
    return http.get(base);
  },
  add: function (model) {
    return http.post(base, model);
  },
  remove: function(id) {
    return http.del(base + id);
  }
};
