"use strict";
import orgs from '../api/orgs'

export function change(key, value) {
  return (dispatch, getState) => {
    let changes = getState.changes;
    changes[key] = value;
    dispatch({type: 'CHANGE_ORG', changes});
  }
}

export function create(shortname) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_CREATE_ORG'})
    orgs.add(shortname)
    .then(data => {
      dispatch({type: 'RECEIVE_CREATE_ORG', data});
    })
    .catch(code => {
      let alert = {
        action: 'organization',
        color: 'red',
        code: code,
        msg: 'Organization could not be created'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function single(id) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_SINGLE_ORG', data})
    orgs.single(id)
    .then(data => {
      dispatch({type: 'RECEIVE_SINGLE_ORG', data});
    })
    .catch(code => {
      if (code != 200) {
        let alert = {
          action: 'load',
          color: 'red',
          code: code,
          msg: 'Organization could not be loaded'
        };
        dispatch({type: 'ALERT', alert});
        console.warn(alert);
      }
    });
  }
}

export function save() {
  return (dispatch) => {
    dispatch({type: 'REQUEST_SAVE_ORG'})
    orgs.save(this.org.id, this.changes)
    .then(data => {
      dispatch({type: 'RECEIVE_SAVE_ORG', data})
      //this._single(id);
    })
    .catch(code => {
      if (code != 200) {
         let alert = {
           action: 'save',
           color: 'red',
           code: code,
           msg: 'Organization details could not be saved'
         };
         dispatch({type: 'ALERT', alert});
         console.warn(alert);
      }
    });
  }
}

export function lookup(name) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_LOOKUP_ORGS'});
    orgs.lookup(name)
    .then(data => {
      dispatch({type: 'RECEIVE_LOOKUP_ORGS', data});
    })
    .catch(code => {
      let alert = {
        action: 'lookup',
        color: 'yellow',
        code: code,
        msg: 'Organizations lookup could not be loaded'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function deactivate() {
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
  //     dispatch({alert: alert});
  //   }
  // })
  // .catch(code => {
  //   dispatch({code: code});
  //   let alert = {
  //     action: 'deactivate',
  //     color: 'red',
  //     code: code,
  //     msg: 'Account could not be deactivated'
  //   };
  //   dispatch({alert: alert});
  //   console.warn(alert);
  // });
}
