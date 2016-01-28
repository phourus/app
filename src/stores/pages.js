"use strict";
let Reflux = require('reflux');
let Actions = require('../actions/pages');

let pages = require('../rest/pages');

let msg = require("../actions/alerts").add;

module.exports = Reflux.createStore({
  init: function () {
    this.listenTo(Actions.get, this._get);
  },
  _get: function (page) {
    pages.get(page)
    .then(data => {
      this.trigger({page: data, id: page});
    })
    .catch(code => {
      if (code != 200) {
        msg('yellow', 'Page could not be loaded', code);
      }
    });
  }
});
