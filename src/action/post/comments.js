"use strict";
import comments from '../../api/comments'

export function collection(params) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_COMMENTS_LIST'});
    comments.collection(params)
    .then(data => {
      dispatch({type: 'RECEIVE_COMMENTS_LIST', params, data});
    })
    .catch(code => {
      let alert = {
        action: 'collection',
        color: 'yellow',
        code: code,
        msg: 'Comments could not be loaded'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function add(model) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_COMMENT_ADD'});
    comments.add(model)
    .then(data => {
      dispatch({type: 'RECEIVE_COMMENT_ADD', data});
    })
    .catch(code => {
      let alert = {
        action: 'add',
        color: 'red',
        code: code,
        msg: 'Comment could not be created'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function save(id, model) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_COMMENT_SAVE'});
    comments.save(id, model)
    .then(data => {
      dispatch({type: 'RECEIVE_COMMENT_SAVE', data});
    })
    .catch(code => {
      let alert = {
        action: 'save',
        color: 'red',
        code: code,
        msg: 'Comment could not be updated'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function remove(id) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_COMMENT_REMOVE'});
    comments.remove(id)
    .then(data => {
      dispatch({type: 'RECEIVE_COMMENT_REMOVE', id});
    })
    .catch(code => {
      let alert = {
        action: 'remove',
        color: 'red',
        code: code,
        msg: 'Comment could not be removed'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}
