var router = require('express').Router();

var users = require('../models/users');
var members = require('../models/members');

router.get('/:id', (req, res) => {
  let id = req.params.id;
  users.single(id)
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});
router.get('/:id/orgs', (req, res) => {
  let id = req.params.id;
  members.getOrgs(id)
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.log(err);
    res.send(500);
  });
});
router.get('', (req, res) => {
  let params;
  users.collection(params)
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
  users.create(model)
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
  users.save(id, model)
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
  users.remove(id)
  .then(function (data) {
    res.send(202, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});

module.exports = router;
