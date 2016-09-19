import { call, put, take, spawn } from 'redux-saga/effects'

import users from '../../../api/users'
import account from '../../../api/account'

export default function* init() {
  yield [
    spawn(change),
    spawn(single),
    spawn(save),
    spawn(deactivate)
  ]
}

function* change(key, value) {
  // this.changes[key] = value
  // this.trigger({changes: this.changes})
}

function* single(id) {
  // users.single(id)
  //   .then(data => {
  //     this.trigger({user: data})
  //   })
  //   .catch(code => {
  //     if (code != 200) {
  //       let alert = {
  //         action: 'load',
  //         color: 'red',
  //         code: code,
  //         msg: 'User could not be loaded'
  //       };
  //       this.trigger({alert: alert});
  //       console.warn(alert);
  //     }
  //   });
}

function* save() {
  // account.edit(this.changes)
  // .then(data => {
  //   if (code == 204) {
  //     msg('green', 'Account updated', code);
  //   }
  // })
  // .catch(code => {
  //   let alert = {
  //     action: 'save',
  //     color: 'red',
  //     code: code,
  //     msg: 'Account could not be updated'
  //   };
  //   this.trigger({alert: alert});
  //   console.warn(alert);
  // });
}

function* deactivate() {
  // account.deactivate
  // .then(code => {
  //   if (code == 202) {
  //     msg('green', 'Account deactivated', code);
  //     let alert = {
  //       action: 'deactivate',
  //       color: 'green',
  //       code: code,
  //       msg: 'Account deactivated'
  //     };
  //     this.trigger({alert: alert});
  //   }
  // })
  // .catch(code => {
  //   this.trigger({code: code});
  //   let alert = {
  //     action: 'deactivate',
  //     color: 'red',
  //     code: code,
  //     msg: 'Account could not be deactivated'
  //   };
  //   this.trigger({alert: alert});
  //   console.warn(alert);
  // });
}
