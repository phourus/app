"use strict";
import tags from '../../api/tags'

export function add(model) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_TAG_ADD'});
    tags.add(model)
    .then(data => {
      dispatch({type: 'RECEIVE_TAG_ADD', data});
    })
    .catch(code => {
      let alert = {
        action: 'add',
        color: 'red',
        code: code,
        msg: 'Tag could not be created'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function remove(id) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_TAG_REMOVE'});
    tags.remove(id)
    .then(data => {
      dispatch({type: 'RECEIVE_TAG_REMOVE', id});
    })
    .catch(code => {
      let alert = {
        action: 'remove',
        color: 'red',
        code: code,
        msg: 'Tag could not be removed'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}
