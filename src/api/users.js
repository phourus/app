import * as http from '../lib/xhr'
let base = '/rest/users/';

export default {
  single: function (id) {
    return http.get(base + id);
  }
};
