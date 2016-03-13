"use strict";
import members from '../api/members'

export function collection(id) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_MEMBERS'});
    let params = {
      orgId: id
    };
    this.orgId = id;
    members.collection(params)
    .then(data => {
      dispatch({type: 'RECEIVE_MEMBERS', data});
    })
    .catch(code => {
      if (code != 200) {
         let alert = {
           action: 'load',
           color: 'red',
           code: code,
           msg: 'Members could not be loaded'
         };
         dispatch({alert: alert});
         console.warn(alert);
      }
    });
  }
}

export function request(orgId) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_MEMBERSHIP'});
    members.request(orgId)
    .then(data => {
      dispatch({type: 'RECEIVE_MEMBERSHIP', data);
    })
    .catch(code => {
      if (code != 200) {
         let alert = {
           action: 'request',
           color: 'red',
           code: code,
           msg: 'Request could not be sent'
         };
         dispatch({type: 'ALERT', alert});
         console.warn(alert);
      }
    });
  }
}

export function approve(id) {
  return (dispatch) => {
    members.approve(id)
    .then(data => {
      //this._collection(this.orgId);
    })
    .catch(code => {
      if (code != 200) {
       let alert = {
         action: 'approve',
         color: 'red',
         code: code,
         msg: 'Membership could not be granted'
       };
       dispatch({alert, type: 'ALERT'});
       console.warn(alert);
      }
    });
  }
}

export function admin(id) {
  return (dispatch) => {
    members.admin(id)
    .then(data => {
      //this._collection(this.orgId);
    })
    .catch(code => {
      if (code != 200) {
        let alert = {
          action: 'grant',
          color: 'red',
          code: code,
          msg: 'Admin privileges could not be granted'
        };
        dispatch({type: 'ALERT',alert});
        console.warn(alert);
      }
    });
  }
}

export function revoke(id) {
  return (dispatch) => {
    members.revoke(id)
    .then(data => {
      //this._collection(this.orgId);
    })
    .catch(code => {
      if (code != 200) {
        let alert = {
          action: 'revoke',
          color: 'red',
          code: code,
          msg: 'Admin privileges could not be revoked'
        };
        dispatch({type: 'ALERT', alert});
        console.warn(alert);
      }
    });
  }
}

export function deny(id) {
  return (dispatch) => {
    members.deny(id)
    .then(data => {
      //this._collection(this.orgId);
    })
    .catch(code => {
      if (code != 200) {
        let alert = {
          action: 'deny',
          color: 'red',
          code: code,
          msg: 'Member could not be denied'
        };
        dispatch({type: 'ALERT', alert});
        console.warn(alert);
      }
    });
  }
}

export function remove(orgId) {
  return (dispatch) => {
    members.remove(orgId)
    .then(data => {
      //dispatch({remove: data});
      //this._orgs();
    })
    .catch(code => {
      let alert = {
        action: 'remove',
        color: 'red',
        code: code,
        msg: 'Organization could not be removed'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}
