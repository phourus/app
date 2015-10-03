var types = require('sequelize');
var db = require('../db');

var votes = db.define('votes', {
  id: {type: types.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
  option: types.STRING
}, {
  classMethods: {
    poll: function (id) {
      return this.findAll({
        where: {postId: id},
        group: 'option',
        attributes: [
          'postId',
          'option',
          [types.fn('COUNT', types.col('option')), 'count']
        ]
      });
    },
    vote: function (id, option) {
      return this.update({option: option}, {where: {postId: id, userId: this.SESSION_USER}})
      .then((data) => {
        if (data[0] === 0) {
          return this.create({postId: id, userId: this.SESSION_USER, option: option});
        }
      });
    }
  }
});

module.exports = votes;
