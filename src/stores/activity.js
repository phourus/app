import Reflux from 'reflux';
import Actions from '../actions/activity';
import account from '../api/account';

export default Reflux.createStore({
  init: function () {
    this.listenTo(Actions.notifications, this._notifications);
    this.listenTo(Actions.history, this._history);
  },
  _notifications: function () {
     account.notifications({})
     .then(data => {
       this.trigger({notifications: data});
     })
     .catch(code => {
       let alert = {
         action: 'notifications',
         color: 'yellow',
         code: code,
         msg: 'Notifications could not be loaded'
       };
       this.trigger({alert: alert});
       console.warn(alert);
     });
  },
  _history: function () {
    account.history({})
    .then(data => {
      this.trigger({history: data});
    })
    .catch(code => {
      this.trigger({code: code});
      let alert = {
        action: 'history',
        color: 'yellow',
        code: code,
        msg: 'History could not be loaded'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
});
