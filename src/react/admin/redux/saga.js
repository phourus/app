import Reflux from 'reflux';
import Actions from '../actions/members';
import members from '../api/members';

export default Reflux.createStore({
  init: function () {
    this.listenTo(Actions.collection, this._collection);
    this.listenTo(Actions.request, this._request);
    this.listenTo(Actions.approve, this._approve);
    this.listenTo(Actions.admin, this._admin);
    this.listenTo(Actions.revoke, this._revoke);
    this.listenTo(Actions.deny, this._deny);
    this.listenTo(Actions.remove, this._remove);
  },
  _collection: function (id) {
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
  },
  _request: function (orgId) {
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
  },
  _approve: function (id) {
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
  },
  _admin: function (id) {
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
  },
  _revoke: function (id) {
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
  },
  _deny: function (id) {
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
  },
  _remove: function (orgId) {
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
});


import Reflux from 'reflux';

import Profile from '../actions/profile'
let Actions = Profile.Org

import orgs from '../api/orgs';

export default Reflux.createStore({
  init: function () {
    this.listenTo(Actions.change, this._change);
    this.listenTo(Actions.create, this._create);
    this.listenTo(Actions.single, this._single);
    this.listenTo(Actions.save, this._save);
    this.listenTo(Actions.lookup, this._lookup);
    this.listenTo(Actions.deactivate, this._deactivate);
  },
  _change: function (key, value) {
    this.changes[key] = value;
    this.trigger({changes: this.changes});
  },
  _create: function (shortname) {
    orgs.add(shortname)
    .then(data => {
      this.trigger({org: data});
    })
    .catch(code => {
      this.trigger({code: code});
      let alert = {
        action: 'organization',
        color: 'red',
        code: code,
        msg: 'Organization could not be created'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
  _single: function (id) {
    orgs.single(id)
      .then(data => {
        this.trigger({org: data});
      })
      .catch(code => {
        if (code != 200) {
          let alert = {
            action: 'load',
            color: 'red',
            code: code,
            msg: 'Organization could not be loaded'
          };
          this.trigger({alert: alert});
          console.warn(alert);
        }
      });
  },
  _save: function () {
    orgs.save(this.org.id, this.changes)
      .then(data => {
        this._single(id);
      })
      .catch(code => {
        if (code != 200) {
           let alert = {
             action: 'save',
             color: 'red',
             code: code,
             msg: 'Organization details could not be saved'
           };
           this.trigger({alert: alert});
           console.warn(alert);
        }
      });
  },
  _lookup: function (name) {
    orgs.lookup(name)
    .then(data => {
      this.trigger({lookup: data});
    })
    .catch(code => {
      this.trigger({code: code});
      let alert = {
        action: 'lookup',
        color: 'yellow',
        code: code,
        msg: 'Organizations lookup could not be loaded'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
  _deactivate: function () {
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
});
