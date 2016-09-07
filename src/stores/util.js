let Reflux = require('reflux');

let Actions = require('../actions/util');

let account = require('../api/account');

module.exports = Reflux.createStore({
  init: function () {
    this.listenTo(Actions.contact, this._contact);
  },
  _contact: function (email, message) {
    account.contact(email, message)
    .then(data => {
      let alert = {
        action: 'contact',
        color: 'green',
        code: 200,
        msg: 'Message sent'
      };
      this.trigger({alert: alert});
    })
    .catch(code => {
      let alert = {
        action: 'contact',
        color: 'red',
        code: code,
        msg: 'Message could not be sent'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  }
});
