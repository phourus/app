import http from '../lib/xhr';
let base = '/rest/pages/';

export default {
  get: function (page) {
    return http.get(base + page);
  }
};
