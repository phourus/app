var router = require('express').Router();

var thumbs = require('../models/thumbs');

router.get('/post/:id', (req, res) => {
  let postId = req.params.id;
  if (req.user_id === false) {
    res.send(401);
    return;
  }
  let userId = req.user_id;
  thumbs.single({userId: userId, postId: postId})
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.get('/user', (req, res) => {
  if (req.user_id === false) {
    res.send(401);
    return;
  }
  let userId = req.user_id;
  thumbs.collection({userId: id})
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.post('', (req, res) => {
  let model = req.body;
  if (req.user_id === false) {
    res.send(401);
    return;
  }
  model.userId = req.user_id;
  thumbs.add(model)
  .then(function (data) {
    res.send(201, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.put('/:id', (req, res) => {
  let id = req.params.id;
  let model = req.body;
  if (req.user_id === false) {
    res.send(401);
    return;
  }
  model.userId = req.user_id;
  thumbs.save(id, model)
  .then(function (data) {
    res.send(204, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.delete('/:id', (req, res) => {
  let id = req.params.id;
  if (req.user_id === false) {
    res.send(401);
    return;
  }
  thumbs.remove(id, req.user_id)
  .then(function (data) {
    res.send(202);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});

module.exports = router;
