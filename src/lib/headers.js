let token = require('./token');
let t = '';
if (token.onConnect) {
  token.onConnect()
  .then(() => {
    token.get('token')
    .then((data) => {
      t = data;
    });
  });
}

module.exports = function () {
  return {
    "Authorization": t
  };
};
