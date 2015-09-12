var router = require('express').Router();
var config = require('../../config');
var db = require('../db');
var users = require('../models/users');
var passwords = require('../models/passwords');
var posts = require('../models/posts');
var members = require('../models/members');
var views = require('../models/views');
var comments = require('../models/comments');
var thumbs = require('../models/thumbs');
//var favs = require('../models/favs');
var jwt = require('jsonwebtoken');
var s3 = require('../s3');

var authDecode = function (auth) {
  let token = auth.split(' ')[1];
  let decoded = new Buffer(token, 'base64').toString().split(':');
  return {
    email: decoded[0],
    password: decoded[1]
  };
};

router.post('/register', (req, res) => {
  let auth = req.headers.authorization;
  let { email, password } = authDecode(auth);
  return db.transaction(function (t) {
    return users.create({email: email}, {transaction: t})
    .then(function (user) {
        return passwords.hash(password)
        .then(function (hash) {
          return passwords.create({userId: user.id, hash: hash}, {transaction: t});
        });
    });
  })
  .then(function (result) {
    console.log(result);
    res.send(202);
  })
  .catch(function (err) {
    console.error(err);
    // duplicate email
    res.send(409);
  });
});

router.post('/login', (req, res) => {
    let auth = req.headers.authorization;
    let { email, password } = authDecode(auth);
    return users.getID (email)
      .then(function (data) {
          if (data === null) {
            console.error('email not found');
            res.send(401);
            //done();
          }
          return data.id;
      })
      .then(function (user_id) {
        return passwords.authorize(user_id, password)
          .then(function (data) {
            if (data !== true) {
              console.error('user_id + hash not found');
              res.send(401);
            }
            return user_id;
          });
      })
      .then(function (result) {
        if (result !== 0) {
          result = jwt.sign({user_id: result}, config.get('salt'));
        }
        res.send(200, result);
      })
      .catch(function (err) {
        console.error(err);
        res.send(500);
      });
});

router.post('/pic', (req, res) => {
  if (!req.user_id) {
    return res.send(401);
  }
  var body = new Buffer(req.body, 'base64');
  s3('users', req.user_id, body)
  .then(function (data) {
    return users.save(req.user_id, {img: data.Location})
    .then(data => {
      res.send(200);
    });
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});

router.get('', (req, res) => {
  if (!req.user_id) {
    return res.send(401);
  }
  users.single(req.user_id)
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.log(err);
    res.send(500);
  });
});

router.put('', (req, res) => {
  var model;
  if (!req.user_id) {
    return res.send(403);
  }
  model = req.body;
  console.log(model);
  users.update(model, {where: {id: req.user_id}})
  .then(function (data) {
    console.log(data);
    res.send(204, data);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500);
  });
});

router.delete('', function () {
  users.update({status: 'closed'}, {where: {id: SESSION_USER}})
  .then(function (data) {
      res.send(202, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(500);
  });
});

router.put('/password', function (current, changed) {
   var hash = passwords.hash(changed);
   passwords.update({hash: hash}, {where: {user_id: SESSION_USER, hash: passwords.hash(current)}})
  .then(function (data) {
      res.send(204, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(500);
  });
});

router.get('/notifications', (req, res) => {
  if (!req.user_id) {
    return res.send(401);
  }
   posts.findAll({where: {userId: req.user_id}})
  .then(function (data) {
      var promises = [];
      var list = [1,2,3];
      // my profile views
      promises.push(views.findAll({
          where: {userId: req.user_id},
          include: [
              {model: users, as: "viewer"}
          ]
      }));
      // comments on my posts
      promises.push(comments.findAll({
          where: {postId: {in: list}},
          include: [
              {model: users, as: "user"},
              {model: posts, as: "post"}
          ]
      }));
      // thumbs on my posts
      promises.push(thumbs.findAll({
          where: {postId: {in: list}},
          include: [
              {model: users, as: "user"},
              {model: posts, as: "post"}
          ]
      }));
      // those who have faved me
      //promises.push(favs.findAll({where: {to_id: SESSION_USER}));
      // ? new post by one of my favs
      return db.Promise.all(promises);
  })
  .then(function (data) {
      res.send(200, data);
  })
  .catch(function (err) {
      console.error(err);
      res.send(500);
  });
});

router.get('/history', (req, res) => {
  if (!req.user_id) {
    return res.send(401);
  }
  let promises = [];
  // posts, users and orgs I've viewed
  promises.push(views.findAll({
      where: {viewerId: req.user_id},
      include: [
          //{model: users, as: "user"},
          {model: posts, as: "post"}
      ]
  }));
  // comments I've made
  promises.push(comments.findAll({
      where: {userId: req.user_id},
      include: [
          {model: posts, as: "post", include: [{model: users, as: "user"}]}
      ]
  }));
  // thumbs I gave
  promises.push(thumbs.findAll({
      where: {userId: req.user_id},
      include: [
          {model: posts, as: "post", include: [{model: users, as: "user"}]}
      ]
  }));
  // users I've faved
  //promises.push(favs.findAll({where: {from_id: SESSION_USER}));

  db.Promise.all(promises)
  .then(function (data) {
      res.send(200, data);
  })
  .catch(function (err) {
      console.log(err);
      res.send(500);
  });
});

router.get('/orgs', (req, res) => {
  if (!req.user_id) {
    return res.send(401);
  }
  members.getOrgs(req.user_id)
  .then(function (data) {
    res.send(200, data);
  })
  .catch(function (err) {
    console.log(err);
    res.send(500);
  });
});

module.exports = router;
