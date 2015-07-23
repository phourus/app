var router = require('express').Router();

var posts = require('../models/posts');

router.get('/:id', (req, res) => {
  var id = req.params.id;
  posts.SESSION_USER = req.user_id;
  posts.single(id)
  .then(function (data) {
    res.send(200, data);
    posts.updateStats(id);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.get('', (req, res) => {
  var params = req.query;
  posts.SESSION_USER = req.user_id;
  posts.collection(params)
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.post('', (req, res) => {
  var model = req.body;
  posts.add(model)
  .then(function (data) {
    res.send(201, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.put('/:id', (req, res) => {
  var id = req.params.id;
  var model = {};
  posts.save(id, model)
  .then(function (data) {
    res.send(204, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.delete('/:id', (req, res) => {
  var id = req.params.id;
  posts.remove(id)
  .then(function (data) {
    res.send(202, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.get('/account', (req, res) => {
   posts.account()
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});

module.exports = router;
