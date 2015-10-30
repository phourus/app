var router = require('express').Router();

var tags = require('../models/tags');
var search = require('../models/search');

router.get('/:id', (req, res) => {
  let id = req.params.id;
  tags.single(id)
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
  tags.collection(params)
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
  tags.add(model)
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
  let id = req.params.id;
  let model = req.body;
  tags.save(id, model)
  .then(function (data) {
    tags.single(id)
    .then(function (tag) {
      search.populate(tag.postId);
    });
    res.send(204, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.delete('/:id', (req, res) => {
  let id = req.params.id;
  tags.remove(id)
  .then(function (data) {
    res.send(202);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});

module.exports = router;
