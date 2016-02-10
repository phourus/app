"use strict";
let Reflux = require('reflux');
let Actions = require('../actions/pages');

let pages = require('../rest/pages');

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
        let alert = {
          action: 'load',
          color: 'yellow',
          code: code,
          msg: 'Page could not be loaded'
        };
        this.trigger({alert: alert});
        console.warn(alert);
      }
    });
  }
});
