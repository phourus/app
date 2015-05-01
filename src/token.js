let localStorage = require('localStorage');

let token = {
    get: function () {
      let token = localStorage.getItem('token'); 
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
