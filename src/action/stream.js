"use strict";
import folders from '../api/folders'
import posts from '../api/posts'
import users from '../api/users'
import orgs from '../api/orgs'

export function collection() {
  return (dispatch, getState) => {
    dispatch({type: 'REQUEST_STREAM_COLLECTION'});
    posts.collection(getState().params)
    .then(data => {
      dispatch({type: 'RECEIVE_STREAM_COLLECTION', data});
    })
    .catch(code => {
      if (code != 200) {
         let alert = {
           action: 'collection',
           color: 'red',
           code: code,
           msg: 'Posts could not be loaded'
         };
         dispatch({type: 'ALERT', alert});
         console.warn(alert);
      }
    });
  }
}

export function select(id) {
  return (dispatch) => {
    dispatch({type: 'STREAM_SELECT', id, scroll: false});
  }
}

export function single(id) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_STREAM_SINGLE'});
    // let local = this._local(id);
    // if (local) {
    //   this.single = local;
    // }
    posts.single(id)
    .then(data => {
      //this.single = data;
      //this._collection();
      dispatch({type: 'RECEIVE_STREAM_SINGLE', data, id});
    })
    .catch(code => {
      if (code != 200) {
         let alert = {
           action: 'load',
           color: 'red',
           code: code,
           msg: 'Post could not be loaded'
         };
         dispatch({type: 'ALERT', alert});
         console.warn(alert);
      }
    });
  }
}

export function local(id) {
  // check local posts indexed by id for match
  // closed post, read post status
  return false;
}

export function search(search) {
  return (dispatch) => {
    dispatch({type: 'STREAM_SEARCH', search});
  }
}

export function nextPage() {
  return (dispatch) => {
    dispatch({type: 'STREAM_NEXT'});
  }
}

export function previousPage() {
  return (dispatch) => {
    dispatch({type: 'STREAM_PREV'});
  }
}

export function more() {
  return (dispatch) => {
    dispatch({type: 'STREAM_MORE'});
  }
}

export function limit(limit) {
  return (dispatch) => {
    dispatch({type: 'STREAM_LIMIT', limit});
  }
}

export function sortBy(sortBy) {
  return (dispatch) => {
    dispatch({type: 'STREAM_SORTBY', sortBy});
  }
}

export function direction(direction) {
  return (dispatch) => {
    dispatch({type: 'STREAM_DIRECTION', direction});
  }
}

export function exclude(type) {
  return (dispatch) => {
    dispatch({type: 'STREAM_EXCLUDE', type});
  }
}

export function type(type) {
  return (dispatch) => {
    dispatch({type: 'STREAM_TYPE', type});
  }
}

export function context(type, id) {
  return (dispatch) => {
    let context = {
      type,
      id,
      profile: {}
    };
    dispatch({type: 'STREAM_CONTEXT', context});
  }
}

export function folder(id) {
  return (dispatch) => {
    dispatch({type: 'STREAM_FOLDER', id})
  }
}

export function save(postId, folderId) {
  return (dispatch) => {
    let remove = false;
    let folder = folderId;
    if (folderId === 0 && getState().params.folder > 0) {
      remove = true;
      folder = getState().params.folder;
    }
    folders.folder(postId, folder, remove)
    .then(data => {
      if (remove) {
        //this._folder(folder);
      }
    })
    .catch(code => {
      let alert = {
        action: 'save',
        color: 'red',
        code: code,
        msg: 'Could not save to folder'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}
