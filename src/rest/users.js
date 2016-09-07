import http from '../lib/xhr';
var base = '/rest/users/';

export default {
  single: function (id) {
    return http.get(base + id);
  }
};
