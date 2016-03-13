"use strict";
import members from '../api/members'

export function collection(id) {
  let params = {
    orgId: id
  };
  this.orgId = id;
  members.collection(params)
    .then(data => {
      this.trigger(data);
    })
    .catch(code => {
      if (code != 200) {
         let alert = {
           action: 'load',
           color: 'red',
           code: code,
           msg: 'Members could not be loaded'
         };
         this.trigger({alert: alert});
         console.warn(alert);
      }
    });
}

export function request(orgId) {
  members.request(orgId)
    .then(data => {
      this.trigger(data);
      // this.trigger({request: data});
      // this._orgs();
    })
    .catch(code => {
      if (code != 200) {
         let alert = {
           action: 'request',
           color: 'red',
           code: code,
           msg: 'Request could not be sent'
         };
         this.trigger({alert: alert});
         console.warn(alert);
      }

      // this.trigger({code: code});
      // let alert = {
      //   action: 'join',
      //   color: 'red',
      //   code: code,
      //   msg: 'Organization access could not be requested'
      // };
      // this.trigger({alert: alert});
      // console.warn(alert);
    });
}

export function approve(id) {
  members.approve(id)
    .then(data => {
      this._collection(this.orgId);
    })
    .catch(code => {
      if (code != 200) {
       let alert = {
         action: 'approve',
         color: 'red',
         code: code,
         msg: 'Membership could not be granted'
       };
       this.trigger({alert: alert});
       console.warn(alert);
      }
    });
}

export function admin(id) {
  members.admin(id)
    .then(data => {
      this._collection(this.orgId);
    })
    .catch(code => {
      if (code != 200) {
        let alert = {
          action: 'grant',
          color: 'red',
          code: code,
          msg: 'Admin privileges could not be granted'
        };
        this.trigger({alert: alert});
        console.warn(alert);
      }
    });
}

export function revoke(id) {
  members.revoke(id)
    .then(data => {
      this._collection(this.orgId);
    })
    .catch(code => {
      if (code != 200) {
        let alert = {
          action: 'revoke',
          color: 'red',
          code: code,
          msg: 'Admin privileges could not be revoked'
        };
        this.trigger({alert: alert});
        console.warn(alert);
      }
    });
}

export function deny(id) {
  members.deny(id)
    .then(data => {
      this._collection(this.orgId);
    })
    .catch(code => {
      if (code != 200) {
        let alert = {
          action: 'deny',
          color: 'red',
          code: code,
          msg: 'Member could not be denied'
        };
        this.trigger({alert: alert});
        console.warn(alert);
      }
    });
}

export function remove(orgId) {
  members.remove(orgId)
  .then(data => {
    this.trigger({remove: data});
    this._orgs();
  })
  .catch(code => {
    this.trigger({code: code});
    let alert = {
      action: 'remove',
      color: 'red',
      code: code,
      msg: 'Organization could not be removed'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}
