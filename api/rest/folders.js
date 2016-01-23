var router = require('express').Router();

var folders = require('../models/folders');
var saved = require('../models/saved');

router.get('/:id', (req, res) => {
  let id = req.params.id;
  folders.single(id)
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.get('', (req, res) => {
  let params = req.query;
  folders.SESSION_USER = req.user_id;
  folders.collection(params)
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
  console.log(model);
  folders.SESSION_USER = req.user_id;
  folders.add(model)
  .then(function (data) {
    res.send(201, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.post('/:id/:postId', (req, res) => {
  let id = req.params.id;
  let postId = req.params.postId;

  if (!req.folders || req.folders.indexOf(id) < 0) {
    //res.send(403);
    //return;
  }
  saved.SESSION_FOLDERS = req.folders;
  saved.SESSION_USER = req.user_id;
  saved.add(postId, id)
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
  folders.save(id, model)
  .then(function (data) {
    res.send(204, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.delete('/:id', (req, res) => {
  // let id = req.params.id;
  // folders.remove(id)
  // .then(function (data) {
  //   res.send(202);
  // })
  // .catch(function (err) {
  //   console.error(err);
  //   res.send(500);
  // });
});
router.delete('/:id/:postId', (req, res) => {
  let id = req.params.id;
  let postId = req.params.postId;

  if (req.folders.indexOf(id) < 0) {
    res.send(403);
    return;
  }
  saved.SESSION_FOLDERS = req.folders;
  saved.SESSION_USER = req.user_id;
  saved.remove(postId, id)
  .then(function (data) {
    res.send(201, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});

module.exports = router;
