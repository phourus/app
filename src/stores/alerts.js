"use strict";
let Reflux = require('reflux');
let Actions = require('../actions/alerts');

module.exports = Reflux.createStore({
  _id: 0,
  _alerts: [],
  init: function () {
    this.listenTo(Actions.add, this._add);
    this.listenTo(Actions.remove, this._remove);
  },
  _add: function (color, msg, code) {
    let id = this._id;
    console.warn('PHOURUS ERROR (' + color + ') ' + code, msg);
    this._alerts.push({id: id, color: color, msg: msg, code: code});
    this._id++;
    //this.trigger(this._alerts);
  },
  _remove: function (i) {
    delete this._alerts[i];
    this.trigger(this._alerts);
  }
});
