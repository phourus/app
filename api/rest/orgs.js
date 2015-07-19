var router = require('express').Router();

var orgs = require('../models/orgs');
var members = require('../models/members');

router.get('/:id', (req, res) => {
  var id = req.params.id;
  orgs.single(id)
  .then(function (data) {
      res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});

router.get('/:id/members', (req, res) => {
  var id = req.params.id;
  members.getMembers(id)
  .then(function (data) {
      res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});

router.get('', (req, res) => {
  var params;
  orgs.collection(params)
  .then(function (data) {
      res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.post('', (req, res) => {
  var model;
  orgs.create(model)
  .then(function (data) {
      res.send(201, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.put('/:id', (req, res) => {
  var id, model;
  orgs.save(id, model)
  .then(function (data) {
      res.send(204, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.delete('/:id', (req, res) => {
  var id;
  orgs.remove(id)
  .then(function (data) {
      res.send(202, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});

module.exports = router;
