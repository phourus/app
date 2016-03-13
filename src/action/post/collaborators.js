"use strict";
import collaborators from '../../api/collaborators'

export function collection(postId) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_COLLABORATORS_LIST'});
    collaborators.collection(postId)
    .then(data => {
      dispatch({type: 'RECEIVE_COLLABORATORS_LIST', data});
    })
    .catch(code => {
      let alert = {
        action: 'collection',
        color: 'red',
        code: code,
        msg: 'Collaborators could not be loaded'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function add(model) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_COLLABORATORS_ADD'});
    collaborators.add(model)
    .then(data => {
      dispatch({type: 'RECEIVE_COLLABORATORS_ADD', data});
      //this._refresh();
    })
    .catch(code => {
      let alert = {
        action: 'add',
        color: 'red',
        code: code,
        msg: 'Collaborator could not be added'
      };
      dispatch({alert: alert});
      console.warn(alert);
    });
  }
}

export function remove(type, id) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_COLLABORATORS_REMOVE'});
    collaborators.remove(type, id)
    .then(data => {
      dispatch({type: 'RECEIVE_COLLABORATORS_REMOVE', data});
      //this._refresh();
    })
    .catch(code => {
      let alert = {
        action: 'remove',
        color: 'red',
        code: code,
        msg: 'Collaborator could not be removed'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function lookup(orgId) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_COLLABORATORS_LOOKUP'})
    collaborators.lookup(orgId)
    .then(data => {
      dispatch({type: 'RECEIVE_COLLABORATORS_LOOKUP', data});
    })
    .catch(code => {
      let alert = {
        action: 'lookup',
        color: 'red',
        code: code,
        msg: 'Lookup could not be loaded'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function refresh() {
  //this._collection(this.postId);
}
