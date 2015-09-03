module.exports = function (req, res, next) {
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
  next();
};
