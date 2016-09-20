import { call, put, take, spawn } from 'redux-saga/effects'

import members from '../../../../api/members'

export default function* init() {
  yield [
    spawn(collection),
    spawn(request),
    spawn(approve),
    spawn(admin),
    spawn(revoke),
    spawn(deny),
    spawn(remove)
  ]
}

function* collection() {
  while (true) {
    const action = yield take('MEMBERS_COLLECTION')
    try {
      const data = yield call(members.collection, {orgId: action.id})
      yield put({type: 'RECEIVE_MEMBERS_COLLECTION', members: data})
    } catch(code) {
      if (code != 200) {
         const alert = {
           action: 'load',
           color: 'red',
           code,
           msg: 'Members could not be loaded'
         }
         yield put({type: 'ALERT', alert})
      }
    }
  }
}

function* request(orgId) {
  // members.request(orgId)
  //   .then(data => {
  //     this.trigger(data);
  //     // this.trigger({request: data});
  //     // this._orgs();
  //   })
  //   .catch(code => {
  //     if (code != 200) {
  //        let alert = {
  //          action: 'request',
  //          color: 'red',
  //          code: code,
  //          msg: 'Request could not be sent'
  //        };
  //        this.trigger({alert: alert});
  //        console.warn(alert);
  //     }
  //
  //     // this.trigger({code: code});
  //     // let alert = {
  //     //   action: 'join',
  //     //   color: 'red',
  //     //   code: code,
  //     //   msg: 'Organization access could not be requested'
  //     // };
  //     // this.trigger({alert: alert});
  //     // console.warn(alert);
  //   });
}

function* approve(id) {
  // members.approve(id)
  //   .then(data => {
  //     this._collection(this.orgId);
  //   })
  //   .catch(code => {
  //     if (code != 200) {
  //      let alert = {
  //        action: 'approve',
  //        color: 'red',
  //        code: code,
  //        msg: 'Membership could not be granted'
  //      };
  //      this.trigger({alert: alert});
  //      console.warn(alert);
  //     }
  //   });
}

function* admin(id) {
  // members.admin(id)
  //   .then(data => {
  //     this._collection(this.orgId);
  //   })
  //   .catch(code => {
  //     if (code != 200) {
  //       let alert = {
  //         action: 'grant',
  //         color: 'red',
  //         code: code,
  //         msg: 'Admin privileges could not be granted'
  //       };
  //       this.trigger({alert: alert});
  //       console.warn(alert);
  //     }
  //   });
}

function* revoke(id) {
  // members.revoke(id)
  //   .then(data => {
  //     this._collection(this.orgId);
  //   })
  //   .catch(code => {
  //     if (code != 200) {
  //       let alert = {
  //         action: 'revoke',
  //         color: 'red',
  //         code: code,
  //         msg: 'Admin privileges could not be revoked'
  //       };
  //       this.trigger({alert: alert});
  //       console.warn(alert);
  //     }
  //   });
}

function* deny(id) {
  // members.deny(id)
  //   .then(data => {
  //     this._collection(this.orgId);
  //   })
  //   .catch(code => {
  //     if (code != 200) {
  //       let alert = {
  //         action: 'deny',
  //         color: 'red',
  //         code: code,
  //         msg: 'Member could not be denied'
  //       };
  //       this.trigger({alert: alert});
  //       console.warn(alert);
  //     }
  //   });
}

function* remove(orgId) {
  // members.remove(orgId)
  // .then(data => {
  //   this.trigger({remove: data});
  //   this._orgs();
  // })
  // .catch(code => {
  //   this.trigger({code: code});
  //   let alert = {
  //     action: 'remove',
  //     color: 'red',
  //     code: code,
  //     msg: 'Organization could not be removed'
  //   };
  //   this.trigger({alert: alert});
  //   console.warn(alert);
  // });
}
