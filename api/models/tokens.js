var types = require('sequelize');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var db = require('../db');
var ROUNDS = 10;
var expiration = '24 hours';

module.exports = db.define('tokens', {
    token: {type: types.STRING, unique: true, index: true, allowNull: false},
    userId: {type: types.INTEGER, index: true, allowNull: false}
}, {
  classMethods: {
    single: function (token, userId) {
      return this.findOne({token: token, userId: userId});
    },
    add: function (userId) {
      var token = crypto.randomBytes(20).toString('hex');
      return this.create({userId: userId, token: token});
    },
    remove: function (id) {
      return this.destroy({where: {id: id}});
    },
    hash: function (password) {
      return new Promise(function (resolve, reject) {
        bcrypt.genSalt(ROUNDS, function(err, salt) {
          if (err) {
            reject(err);
          }
          bcrypt.hash(password, salt, function(err, crypted) {
            if (err) {
              reject(err);
            }
            resolve(crypted);
          });
        });
      });
    }
  }
});
