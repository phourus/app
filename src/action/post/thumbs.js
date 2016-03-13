"use strict";
import thumbs from '../../api/thumbs'

export function post(id) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_THUMB_POST'});
    thumbs.post(id)
    .then(data => {
      dispatch({type: 'RECEIVE_THUMB_POST', data, id});
    })
    .catch(code => {
      let alert = {
        action: 'load',
        color: 'red',
        code: code,
        msg: 'Thumbs could not be loaded'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function add(model) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_THUMB_ADD'});
    thumbs.add(model)
    .then(data => {
      dispatch({type: 'RECEIVE_THUMB_ADD', data});
      //this._post(this.postId);
    })
    .catch(code => {
      let alert = {
        action: 'add',
        color: 'red',
        code: code,
        msg: 'Thumb could not be added'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function save(id, model) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_THUMB_SAVE'});
    thumbs.save(id, model)
    .then(data => {
      dispatch({type: 'RECEIVE_THUMB_SAVE', data});
      //this._post(this.postId);
    })
    .catch(code => {
      let alert = {
        action: 'save',
        color: 'red',
        code: code,
        msg: 'Thumb could not be saved'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function remove(id) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_THUMB_REMOVE'});
    thumbs.remove(id)
    .then(data => {
      dispatch({type: 'RECEIVE_THUMB_REMOVE', data, id});
    })
    .catch(code => {
      let alert = {
        action: 'remove',
        color: 'red',
        code: code,
        msg: 'Thumb could not be removed'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}
