import { call, put, take, spawn, select } from 'redux-saga/effects'

import * as selectors from './selectors'

import folders from '../../../api/folders'
import posts from '../../../api/posts'
import users from '../../../api/users'
import orgs from '../../../api/orgs'

export default function* init() {
  yield [
    spawn(collection),
    spawn(filter),
    // spawn(save),
    // spawn(context)
  ]
}

function* collection() {
  while (true) {
    const action = yield take('STREAM_COLLECTION')
    yield put({type: 'REQUEST_STREAM_COLLECTION'})
    try {
      const params = yield select(selectors.params)
      const data = yield call(posts.collection, params)
      // concat?
      // if (this.posts) {
      //   this.posts = this.posts.concat(data.rows);
      // } else {
      //   this.posts = data.rows;
      // }
      // if (this.single) {
      //   this.posts.unshift(this.single);
      //   this.single = null;
      // }
      // this.trigger({posts: this.posts, total: data.count, params: this.params, scroll: this.scroll});
      yield put({type: 'RECEIVE_STREAM_COLLECTION', posts: data.rows, total: data.count})
    } catch(code) {
      if (code != 200) {
         const alert = {
           action: 'collection',
           color: 'red',
           code,
           msg: 'Posts could not be loaded'
         }
         yield put({type: 'ALERT', alert})
      }
    }
  }
}

function* filter() {
  while (true) {
    yield take([
      'STREAM_EXCLUDE',
      'STREAM_TYPE',
      'STREAM_FOLDER',
      'STREAM_MORE',
      'STREAM_SEARCH',
      'STREAM_LIMIT',
      'STREAM_SORT',
      'STREAM_DIRECTION'
    ])
    yield put({type: 'STREAM_COLLECTION'})
  }
}

function* save(postId, folderId) {
  // let remove = false;
  // let folder = folderId;
  // if (folderId === 0 && this.params.folder > 0) {
  //   remove = true;
  //   folder = this.params.folder;
  // }
  // folders.folder(postId, folder, remove)
  // .then(data => {
  //   if (remove) {
  //     this._folder(folder);
  //   }
  // })
  // .catch(code => {
  //   let alert = {
  //     action: 'save',
  //     color: 'red',
  //     code: code,
  //     msg: 'Could not save to folder'
  //   };
  //   this.trigger({alert: alert});
  //   console.warn(alert);
  // });
}

function* context(type, id) {
  // this.params.page = 1;
  // this.params.context = {
  //   type: type,
  //   id: id,
  //   profile: {}
  // };
  // this.trigger({context: this.params.context});
  // this.posts = [];
  // // create
  // if (type === 'create') {
  //   let model = {id: 'create', title: '', content: '', user: {}};
  //   this.posts = [model];
  //   this.trigger({posts: this.posts, total: this.posts.length, params: this.params, scroll: this.scroll});
  //   return;
  // }
  // // no context
  // if (type === null) {
  //   this._collection();
  //   return;
  // }
  // // post || edit
  // if (type === 'post' || type === 'edit') {
  //   this._single(id);
  //   return;
  // }
  //
  // // me
  // if (type === 'me') {
  //   //this.params.context.profile = data;
  //   this.trigger({context: this.params.context});
  //   this._collection();
  //   return;
  // }
  // // users/orgs
  // let profile = users;
  // if (type === 'org') {
  //   profile = orgs;
  // }
  // profile.single(id)
  //   .then(data => {
  //     this.params.context.profile = data;
  //     this.params.context.id = data.id;
  //     this.trigger({context: this.params.context});
  //     this._collection();
  //   })
  //   .catch(code => {
  //     if (code != 200) {
  //        let alert = {
  //          action: 'profile',
  //          color: 'red',
  //          code: code,
  //          msg: 'Could not load posts for this profile'
  //        };
  //        this.trigger({alert: alert});
  //        console.warn(alert);
  //     }
  //   });
}
