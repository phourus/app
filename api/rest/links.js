var router = require('express').Router();

var links = require('../models/links');
var search = require('../models/search');

router.get('/:id', (req, res) => {
    var id;
    links.single(id)
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
    links.collection(params)
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
  links.add(model)
  .then(function (data) {
      search.populate(model.postId);
      res.send(200, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(500);
  });
});
router.post('/attachment', (req, res) => {
  console.log(req.files);
  res.send(200);
});

router.put('/:id', (req, res) => {
  var id = req.params.id;
  var model = req.body;
  links.save(id, model)
  .then(function (data) {
      links.single(id)
      .then(function (link) {
        search.populate(link.postId);
      });
      res.send(200, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(500);
  });
});
router.delete('/:id', (req, res) => {
  var id = req.params.id;
  links.remove(id)
  .then(function (data) {
    res.send(202);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});

module.exports = router;
