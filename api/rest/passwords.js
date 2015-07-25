var router = require('express').Router();

var passwords = require('../models/passwords');

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

module.exports = router;
