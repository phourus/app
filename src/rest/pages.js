import http from '../lib/xhr';
var base = '/rest/pages/';

export default {
  get: function (page) {
    return http.get(base + page);
  }
};
