var router = require('express').Router();
var Email = require('../../email');
var passwords = require('../models/passwords');

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
  console.log('forgot ' + model.email);
  // generate temporary reset token
  // send email with token and userId
  Email('reset', {token: 'abc123', userId: 3, email: model.email});
  res.send(200);
});

router.post('/reset', (req, res) => {
  let model = req.body;
  let auth = req.headers.authorization;
  // lookup token, user id and date less than

  // if valid, verify email + userId in user table is valid
  let { email, password } = authDecode(auth);

  // if valid, update password in passwords where userId = userId
  passwords.reset(model.userId, password);
  res.send(200);
});

module.exports = router;
