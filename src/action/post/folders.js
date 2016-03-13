"use strict";
import folders from '../../api/folders'

export function collection() {
  return (dispatch) => {
    dispatch({type: 'REQUEST_FOLDERS_LIST'});
    folders.collection({})
    .then(data => {
      dispatch({type: 'RECEIVE_FOLDERS_LIST', data});
    })
    .catch(code => {
      if (code != 200) {
       let alert = {
         action: 'collection',
         color: 'red',
         code: code,
         msg: 'Folders could not be loaded'
       };
       dispatch({type: 'ALERT', alert});
       console.warn(alert);
      }
    });
  }
}

export function add(model) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_FOLDER_ADD'})
    folders.add(model)
    .then(data => {
      dispatch({type: 'RECEIVE_FOLDER_ADD', data});
    })
    .catch(code => {
      let alert = {
        action: 'add',
        color: 'red',
        code: code,
        msg: 'Folder could not be created'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function remove(id) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_FOLDER_REMOVE'});
    folders.remove(id)
    .then(data => {
      dispatch({type: 'RECEIVE_FOLDER_REMOVE', id});
    })
    .catch(code => {
      let alert = {
        action: 'remove',
        color: 'red',
        code: code,
        msg: 'Folder could not be removed'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}
