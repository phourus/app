"use strict";
import account from '../api/account'

export function notifications() {
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
}

export function history() {
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
}
