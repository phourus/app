var router = require('express').Router();

var comments = require('../models/comments');
var search = require('../models/search');

router.get('', (req, res) => {
  var params = req.query;
  comments.collection(params)
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
  comments.SESSION_USER = req.user_id;
  comments.add(model)
  .then(function (data) {
    search.populate(model.postId);
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
  comments.SESSION_USER = req.user_id;
  comments.save(id, model)
  .then(function (data) {
      comments.single(id)
      .then(function (comment) {
        search.populate(comment.postId);
      });
      res.send(204, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(500);
  });
});
router.delete('/:id', (req, res) => {
  var id = req.query.id;
  if (req.user_id === false) {
    res.send(401);
    return;
  }
  comments.SESSION_USER = req.user_id;
  comments.remove(id)
  .then(function (data) {
      res.send(204, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(500);
  });
});

module.exports = router;
