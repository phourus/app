import * as http from '../lib/xhr'
import util from '../lib/util'
let base = '/rest/posts/';

export default {
  single: function (id) {
    return http.get(base + id);
  },
  collection: function (params) {
    let query = Object.assign({}, params)
    query.contextId = params.context.id
    query.contextType = params.context.type
    delete query.context
    const q = util.queryString(query)
    return http.get(base + '?' + q)
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
