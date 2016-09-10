import * as http from '../lib/xhr'
let base = '/rest/comments/';

export default {
  collection: function (params) {
    let query = "";
    if (params.postId) {
      query += 'postId=' + params.postId;
    }
    if (params.userId) {
      query += 'userId=' + params.userId;
    }
    return http.get(base + '?' + query);
  },
  add: function (model) {
    return http.post(base, model);
  },
  save: function (id, model) {
    return http.put(base + id, model);
  },
  remove: function(id) {
    return http.del(base + id);
  }
};
