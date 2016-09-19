import { call, put, take, spawn } from 'redux-saga/effects'

import account from '../../../api/account'

export default function* init() {
  yield [
    spawn(notifications),
    spawn(history)
  ]
}

function* notifications() {
  //  account.notifications({})
  //  .then(data => {
  //    this.trigger({notifications: data});
  //  })
  //  .catch(code => {
  //    let alert = {
  //      action: 'notifications',
  //      color: 'yellow',
  //      code: code,
  //      msg: 'Notifications could not be loaded'
  //    };
  //    this.trigger({alert: alert});
  //    console.warn(alert);
  //  });
}

function* history() {
  // account.history({})
  // .then(data => {
  //   this.trigger({history: data});
  // })
  // .catch(code => {
  //   this.trigger({code: code});
  //   let alert = {
  //     action: 'history',
  //     color: 'yellow',
  //     code: code,
  //     msg: 'History could not be loaded'
  //   };
  //   this.trigger({alert: alert});
  //   console.warn(alert);
  // });
}
