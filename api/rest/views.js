var router = require('express').Router();

var views = require('../models/views');

router.get('', (req, res) => {
  let params;
  views.collection(params)
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});

module.exports = router;
