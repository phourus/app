var router = require('express').Router();

var collaborators = require('../models/collaborators');

router.get('/:postId', (req, res) => {
  var postId = req.params.postId;

  collaborators.collection(postId)
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

  collaborators.create(model)
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});

router.delete('/:type/:id', (req, res) => {
  var type = req.params.type;
  var id = req.params.id;

  collaborators.remove(type, id)
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});

router.get('/lookup/:orgId', (req, res) => {
  var orgId = req.params.orgId;

  collaborators.lookup(orgId)
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});

module.exports = router;
