var router = require('express').Router();

var posts = require('../models/posts');
var votes = require('../models/votes');
var search = require('../models/search');

router.get('/shared', (req, res) => {
  var params = req.query;
  posts.SESSION_USER = req.user_id;
  posts.SESSION_TEAMS = req.teams;
  posts.shared(params)
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.get('/:id', (req, res) => {
  var id = req.params.id;
  posts.SESSION_USER = req.user_id;
  posts.single(id)
  .then(function (data) {
    res.send(200, data);
    posts.updateStats(id);
    //posts.setStats(id);
    posts.setInfluence(id);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.get('', (req, res) => {
  var params = req.query;
  posts.SESSION_USER = req.user_id;
  posts.SESSION_ORGANIZATIONS = req.organizations;
  posts.SESSION_ADMIN = req.admin;
  posts.SESSION_TEAMS = req.teams;
  posts.SESSION_POSTS = req.posts;
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
  if (req.user_id === false) {
    res.send(401);
    return;
  }
  posts.SESSION_USER = req.user_id;
  posts.add(model)
  .then(function (data) {
    search.add(data);
    res.send(201, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.put('/:id', (req, res) => {
  var id = req.params.id;
  var model = req.body;
  if (req.user_id === false) {
    res.send(401);
    return;
  }
  posts.SESSION_USER = req.user_id;
  posts.save(id, model)
  .then(function (data) {
    posts.single(id)
    .then(function (data) {
      search.save(data);
    });
    res.send(204, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.delete('/:id', (req, res) => {
  var id = req.params.id;
  if (req.user_id === false) {
    res.send(401);
    return;
  }
  posts.SESSION_USER = req.user_id;
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
  if (req.user_id === false) {
    res.send(401);
    return;
  }
  posts.SESSION_USER = req.user_id;
  posts.account()
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.get('/:id/poll', (req, res) => {
  var id = req.params.id;
  votes.poll(id)
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.post('/:id/vote', (req, res) => {
  var id = req.params.id;
  var model = req.body;
  votes.SESSION_USER = req.user_id;
  votes.vote(id, model.option)
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});

module.exports = router;
