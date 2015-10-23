var jwt = require('jsonwebtoken');
var config = require("../../config");

var members = require('../models/members');
var teammates = require('../models/teammates');

module.exports = function (req, res, next) {
  var token = req.headers.authorization;
  // skip jwt verification if login/Basic auth
  //if (token.match(/^Basic $/)) { next(); }
  req.user_id = false;
  try {
    jwt.verify(token, config.get('salt'));
    var decoded = jwt.decode(token);
    req.user_id = decoded.user_id;
    req.posts = [];
    members.findAll({where: {userId: req.user_id, approved: 1}})
    .then(function (data) {
      data = data || [];
      req.organizations = data.filter(function (item) {
        return item.approved;
      })
      .map(function (item) {
        return item.orgId;
      });

      req.admin = data.filter(function (item) {
        return item.admin;
      })
      .map(function (item) {
        return item.orgId;
      });

      teammates.findAll({where: {userId: req.user_id}})
      .then(function (data) {
        data = data || [];
        req.teams = data.map(function (item) {
          return item.teamId;
        });
        return next();
      });
    })
    .catch(function (err) {
      console.error(err);
      return next();
    });
  } catch(err) {
    console.error(err);
    return next();
  }

  // var GET = {
  //   account: {
  //     methods: ['GET', 'PUT', 'DELETE']
  //     password: ['PUT'],
  //     notifications: ['GET'],
  //     history: ['GET'],
  //     orgs: ['GET']
  //   },
  //   comments: {
  //     methods: ['POST', 'PUT', 'DELETE']
  //   },
  //   links: {
  //     methods: ['POST', 'PUT', 'DELETE'],
  //     attachment: ['POST']
  //   },
  //   locations: {
  //     methods: ['POST', 'PUT', 'DELETE']
  //   },
  //   members: {
  //     methods: ['POST', 'PUT', 'DELETE']
  //   },
  // };
  // if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
  //   if (req.user_id === false) {
  //     res.send(401);
  //     return;
  //   }
  // }
};
