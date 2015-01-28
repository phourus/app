var localStorage = require('localStorage');

var token = {
    get: function () {
      var token = localStorage.getItem('token'); 
      if (!token) {
          token = false;
      } 
      return token;
    },
    save: function (token) {
      localStorage.setItem('token', token);
    },
    remove: function () {
      localStorage.removeItem('token');
    }
}
module.exports = token;