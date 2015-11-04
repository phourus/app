var type = 'sockets';
var orgs = require('../rest/orgs');

module.exports = {
  single: orgs.single,
  lookup: orgs.lookup,
  save: orgs.save
};
