var router = require('express').Router();

var thumbs = require('../models/thumbs');

router.get('/:id', (req, res) => {
  let id;
  thumbs.single(id)
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
  thumbs.collection(params)
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.post('', (req, res) => {
  let model;
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
  let id, model;
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
  let id;
  thumbs.remove(id)
  .then(function (data) {
    res.send(202, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});

module.exports = router;
