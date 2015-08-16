var types = require('sequelize');
var bcrypt = require('bcrypt');
var db = require('../db');
var ROUNDS = 10;

module.exports = db.define('passwords', {
    hash: types.STRING
}, {
  classMethods: {
    authorize: function (user_id, password) {
      return this.find({where: {userId: user_id}})
      .then(function (data) {
        return new Promise(function (resolve, reject) {
          bcrypt.compare(password, data.hash, function(err, res) {
            if (err) {
              reject(err);
            }
            resolve(res);
          });
        });
      });
    },
    change: function (user_id, old, updated) {
      return this.authorize(user_id, old)
      .then(function (data) {
        if (data.length === 1) {
          this.update(user_id, {hash: this.hash(updated)});
        }
      });
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
