//let localStorage = require('localStorage');
let token = false;

module.exports = {
    get: function () {
      try {
        token = localStorage.getItem('token');
        if (!token) {
            token = false;
        }
        return token;
      } catch (e) {
        console.warn('localStorage not supported');
        return token;
      }
    },
    save: function (jwt) {
      try {
        localStorage.setItem('token', jwt);
      } catch (e) {
        token = jwt;
        console.warn('localStorage not supported');
      }
    },
    remove: function () {
      try {
        localStorage.removeItem('token');
      } catch (e) {
        token = false;
        console.warn('localStorage not supported');
      }
    }
};
