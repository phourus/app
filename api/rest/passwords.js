var router = require('express').Router();
var Email = require('../../email');
var passwords = require('../models/passwords');
var tokens = require('../models/tokens');
var users = require('../models/users');

/** DUPLICATED FROM ACCOUNT **/
var authDecode = function (auth) {
  let token = auth.split(' ')[1];
  let decoded = new Buffer(token, 'base64').toString().split(':');
  return {
    email: decoded[0],
    password: decoded[1]
  };
};

router.put('', (req, res) => {
  if (!req.user_id) {
    return res.send(401);
  }
  let model = req.body;
  passwords.SESSION_USER = req.user_id;
  passwords.save(model)
  .then(function (data) {
      res.send(204, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});

router.post('/forgot', (req, res) => {
  let model = req.body;
  users.getID(model.email)
  .then(function (data) {
    tokens.add(data.id)
    .then(function (token) {
      Email('reset', {token: token.token, userId: token.userId, email: model.email});
      return res.send(200);
    });
  })
  .catch(function (err) {
    console.error(err);
    return res.send(500);
  });
});

router.post('/reset', (req, res) => {
  let model = req.body;
  let auth = req.headers.authorization;

  tokens.single(model.token, model.userId)
  .then(function (data) {
    let { email, password } = authDecode(auth);
    users.getID(email)
    .then(function (data) {
      if (!data || data.id !== parseInt(model.userId)) {
        return res.send(403);
      }
      passwords.reset(model.userId, password)
      .then(function (data) {
        return res.send(204);
      });
    });
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});

module.exports = router;
