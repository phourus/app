import { call, put, take, spawn } from 'redux-saga/effects'

import * as selectors from './selectors'

import folders from '../../../api/folders'
import posts from '../../../api/posts'
import users from '../../../api/users'
import orgs from '../../../api/orgs'

export default function* init() {
  yield [
    spawn(collection),
    spawn(select),
    spawn(single),
    spawn(search),
    spawn(nextPage),
    spawn(prevPage),
    spawn(more),
    spawn(limit),
    spawn(sortBy),
    spawn(direction),
    spawn(exclude),
    spawn(type),
    spawn(context),
    spawn(folder),
    spawn(save),
  ]
}

function* collection() {
  while (true) {
    const action = yield take('STREAM_COLLECTION')
    yield put({type: 'REQUEST_STREAM_COLLECTION'})
    try {
      //const params = yield select()
      //console.log(params)
      const data = yield call(posts.collection, {context:{}})
      console.log(data)
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

function* select (id) {
  // this.selected = id;
  // this.scroll = false;
  // this.trigger({selected: this.selected, scroll: this.scroll});
}

function* single (id) {
  // let local = this._local(id);
  // if (local) {
  //   this.single = local;
  // }
  // posts.single(id)
  // .then(data => {
  //   this.single = data;
  //   this._collection();
  // })
  // .catch(code => {
  //   if (code != 200) {
  //      let alert = {
  //        action: 'load',
  //        color: 'red',
  //        code: code,
  //        msg: 'Post could not be loaded'
  //      };
  //      this.trigger({alert: alert});
  //      console.warn(alert);
  //   }
  // });
}

function* local(id) {
  // check local posts indexed by id for match
  // closed post, read post status
  //return false;
}

function* search(search) {
  // this.posts = [];
  // this.params.page = 1;
  // this.params.search = search;
  // this._collection();
}

function* nextPage() {
  // if ( Math.ceil(this.params.page * this.params.limit) < this.total ) {
  //   this.params.page++;
  //   this._collection();
  // }
}

function* prevPage() {
  // if (this.params.page > 1) {
  //   this.params.page--;
  //   this._collection();
  // }
}

function* more() {
  // this.params.page++;
  // this.scroll = true;
  // this._collection();
}

function* limit(limit) {
  // this.params.limit = limit;
  // this._collection();
}

function* sortBy(sortBy) {
  // this.posts = [];
  // this.params.page = 1;
  // this.params.sortBy = sortBy;
  // this._collection();
}

function* direction(direction) {
  // this.posts = [];
  // this.params.page = 1;
  // this.params.direction = direction;
  // this._collection();
}

function* exclude(type) {
  // this.posts = [];
  // this.params.page = 1;
  // let exclude = this.params.exclude;
  // let index = exclude.indexOf(type);
  // if (index > -1) {
  //   exclude.splice(index, 1);
  // } else {
  //   exclude.push(type);
  // }
  // this.params.exclude = exclude;
  // this._collection();
}

function* type(type) {
  // let types = ['blog', 'event', 'subject', 'question', 'debate', 'poll', 'belief', 'quote'];
  // this.params.page = 1;
  // if (this.params.exclude.length === 7) {
  //   this.params.exclude = [];
  // } else {
  //   let index = types.indexOf(type);
  //   if (index !== -1) {
  //     types.splice(index, 1);
  //     this.params.exclude = types;
  //   }
  // }
  // this.posts = [];
  // this._collection();
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

function* folder(id) {
  // this.posts = null;
  // this.params.page = 1;
  // this.params.folder = id;
  // this._collection();
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