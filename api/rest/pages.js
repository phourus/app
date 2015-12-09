var router = require('express').Router();
var fs = require('fs');

router.get('/:page', (req, res) => {
  var page = req.params.page;
  var file = './docs/' + page + '.md';
  fs.readFile(file, function (err, data) {
    if (err) {
      console.error(err);
      res.send(500);
    }
    res.send(200, data);
  });
});

module.exports = router;
