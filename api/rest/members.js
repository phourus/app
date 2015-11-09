var router = require('express').Router();

var members = require('../models/members');

router.get('/:id', (req, res) => {
  var id = req.params.id;
  members.single(id)
  .then(function (data) {
      res.send(200, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(500);
  });
});
router.get('', (req, res) => {
  var params = req.query;
  var result;
  if (params.orgId) {
    result = members.getMembers(params.orgId);
  }
  if (params.userId) {
    result = members.getOrgs(params.userId);
  }
  result
  .then(function (data) {
      res.send(200, data[0]);
  })
  .catch(function (err) {
      console.error(err);
      res.send(500);
  });
});
router.post('', (req, res) => {
  var model = req.body;
  members.SESSION_USER = req.user_id;
  members.request(model.orgId)
  .then(function (data) {
      res.send(200, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(500);
  });
});
router.put('/:id', (req, res) => {
  var id = req.params.id;
  var model = req.body;
  members.save(id, model)
  .then(function (data) {
      res.send(200, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(500);
  });
});
router.delete('/:id', (req, res) => {
  var id = req.params.id;
  members.SESSION_USER = req.user_id;
  members.remove(id)
  .then(function (data) {
      res.send(202);
  })
  .catch(function (err) {
      console.error(err);
      res.send(500);
  });
});

module.exports = router;
