import { call, put, take, spawn } from 'redux-saga/effects'

import account from '../../../api/account'
import pages from '../../../api/pages'

export default function* init() {
  yield [
    spawn(contact),
    spawn(page)
  ]
}

function* contact(email, message) {
  //   account.contact(email, message)
  //   .then(data => {
  //     let alert = {
  //       action: 'contact',
  //       color: 'green',
  //       code: 200,
  //       msg: 'Message sent'
  //     };
  //     this.trigger({alert: alert});
  //   })
  //   .catch(code => {
  //     let alert = {
  //       action: 'contact',
  //       color: 'red',
  //       code: code,
  //       msg: 'Message could not be sent'
  //     };
  //     this.trigger({alert: alert});
  //     console.warn(alert);
  //   });
  // }
}

function* page(id) {
  //   pages.get(page)
  //   .then(data => {
  //     this.trigger({page: data, id: page});
  //   })
  //   .catch(code => {
  //     if (code != 200) {
  //       let alert = {
  //         action: 'load',
  //         color: 'yellow',
  //         code: code,
  //         msg: 'Page could not be loaded'
  //       };
  //       this.trigger({alert: alert});
  //       console.warn(alert);
  //     }
  //   });
  // }
}
