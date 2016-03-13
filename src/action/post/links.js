"use strict";
import links from '../../api/links'

export function add(model) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_LINK_ADD'});
    links.add(model)
    .then(data => {
      dispatch({type: 'RECEIVE_LINK_ADD', data});
    })
    .catch(code => {
      let alert = {
        action: 'add',
        color: 'red',
        code: code,
        msg: 'Link could not be created'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function save(id, model) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_LINK_SAVE'});
    links.save(id, model)
    .then(data => {
      dispatch({type: 'RECEIVE_LINK_SAVE', data});
    })
    .catch(code => {
      let alert = {
        action: 'save',
        color: 'red',
        code: code,
        msg: 'Link could not be saved'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function remove(id) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_LINK_REMOVE'});
    links.remove(id)
    .then(data => {
      dispatch({type: 'RECEIVE_LINK_REMOVE', id});
    })
    .catch(code => {
      let alert = {
        action: 'remove',
        color: 'red',
        code: code,
        msg: 'Link could not be removed'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}
