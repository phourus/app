import { call, put, take, spawn } from 'redux-saga/effects'

import members from './sagas/members'

import orgs from '../../../api/orgs'

export default function* init() {
  yield [
    spawn(change),
    spawn(create),
    spawn(single),
    spawn(save),
    spawn(lookup),
    spawn(deactivate),
    spawn(members)
  ]
}

function* change(key, value) {
  // this.changes[key] = value;
  // this.trigger({changes: this.changes});
}

function* create(shortname) {
  // orgs.add(shortname)
  // .then(data => {
  //   this.trigger({org: data});
  // })
  // .catch(code => {
  //   this.trigger({code: code});
  //   let alert = {
  //     action: 'organization',
  //     color: 'red',
  //     code: code,
  //     msg: 'Organization could not be created'
  //   };
  //   this.trigger({alert: alert});
  //   console.warn(alert);
  // });
}

function* single(id) {
  while (true) {
    const action = yield take('ADMIN_SINGLE')
    try {
      const data = yield call(orgs.single, action.id)
      yield put({type: 'RECEIVE_ADMIN_SINGLE', org: data})
    } catch(code) {
      if (code != 200) {
        const alert = {
          action: 'load',
          color: 'red',
          code,
          msg: 'Organization could not be loaded'
        };
        yield put({type: 'ALERT', alert})
      }
    }
  }
}

function* save() {
  // orgs.save(this.org.id, this.changes)
  //   .then(data => {
  //     this._single(id);
  //   })
  //   .catch(code => {
  //     if (code != 200) {
  //        let alert = {
  //          action: 'save',
  //          color: 'red',
  //          code: code,
  //          msg: 'Organization details could not be saved'
  //        };
  //        this.trigger({alert: alert});
  //        console.warn(alert);
  //     }
  //   });
}

function* lookup(name) {
  // orgs.lookup(name)
  // .then(data => {
  //   this.trigger({lookup: data});
  // })
  // .catch(code => {
  //   this.trigger({code: code});
  //   let alert = {
  //     action: 'lookup',
  //     color: 'yellow',
  //     code: code,
  //     msg: 'Organizations lookup could not be loaded'
  //   };
  //   this.trigger({alert: alert});
  //   console.warn(alert);
  // });
}

function* deactivate() {
  // orgs.deactivate
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
