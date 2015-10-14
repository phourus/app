var collaborators = require('../rest/collaborators');

module.exports = {
  collection: collaborators.collection,
  add: collaborators.add,
  remove: collaborators.remove,
  lookup: collaborators.lookup
};
