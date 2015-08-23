//let localStorage = require('localStorage');

let token = {
    get: function () {
      try {
        let token = localStorage.getItem('token');
        if (!token) {
            token = false;
        }
        return token;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    save: function (token) {
      try {
        localStorage.setItem('token', token);
      } catch (e) {
        console.error(e);
      }
    },
    remove: function () {
      try {
        localStorage.removeItem('token');
      } catch (e) {
        console.error(e);
      }
    }
}
module.exports = token;
