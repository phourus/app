import Reflux from 'reflux';
import Actions from '../actions/util';
import account from '../api/account';

export default Reflux.createStore({
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

import Reflux from 'reflux';
import Actions from '../actions/pages';
import pages from '../rest/pages';

export default Reflux.createStore({
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
