"use strict";
import folders from '../api/folders'
import posts from '../api/posts'
import users from '../api/users'
import orgs from '../api/orgs'

// posts: null,
// total: 0,
// selected: 0,
// scroll: false,
// params: {
//   exclude: [],
//   search: '',
//   sortBy: 'influence',
//   direction: 'DESC',
//   page: 1,
//   limit: 10,
//   folder: 0,
//   context: {
//     type: '',
//     id: null
//   }
// },

export function collection() {
  posts.collection(this.params)
  .then(data => {
    this.total = data.count;
    if (this.posts) {
      this.posts = this.posts.concat(data.rows);
    } else {
      this.posts = data.rows;
    }
    if (this.single) {
      this.posts.unshift(this.single);
      this.single = null;
    }
    dispatch({posts: this.posts, total: data.count, params: this.params, scroll: this.scroll});
  })
  .catch(code => {
    if (code != 200) {
       let alert = {
         action: 'collection',
         color: 'red',
         code: code,
         msg: 'Posts could not be loaded'
       };
       dispatch({alert: alert});
       console.warn(alert);
    }
  });
}

export function select(id) {
  this.selected = id;
  this.scroll = false;
  dispatch({selected: this.selected, scroll: this.scroll});
}

export function single(id) {
  let local = this._local(id);
  if (local) {
    this.single = local;
  }
  posts.single(id)
  .then(data => {
    this.single = data;
    this._collection();
  })
  .catch(code => {
    if (code != 200) {
       let alert = {
         action: 'load',
         color: 'red',
         code: code,
         msg: 'Post could not be loaded'
       };
       dispatch({alert: alert});
       console.warn(alert);
    }
  });
}

export function local(id) {
  // check local posts indexed by id for match
  // closed post, read post status
  return false;
}

export function search(search) {
  this.posts = [];
  this.params.page = 1;
  this.params.search = search;
  this._collection();
}

export function nextPage() {
  if ( Math.ceil(this.params.page * this.params.limit) < this.total ) {
    this.params.page++;
    this._collection();
  }
}

export function previousPage() {
  if (this.params.page > 1) {
    this.params.page--;
    this._collection();
  }
}

export function more() {
  this.params.page++;
  this.scroll = true;
  this._collection();
}

export function limit(limit) {
  this.params.limit = limit;
  this._collection();
}

export function sortBy(sortBy) {
  this.posts = [];
  this.params.page = 1;
  this.params.sortBy = sortBy;
  this._collection();
}

export function direction(direction) {
  this.posts = [];
  this.params.page = 1;
  this.params.direction = direction;
  this._collection();
}

export function exclude(type) {
  this.posts = [];
  this.params.page = 1;
  let exclude = this.params.exclude;
  let index = exclude.indexOf(type);
  if (index > -1) {
    exclude.splice(index, 1);
  } else {
    exclude.push(type);
  }
  this.params.exclude = exclude;
  this._collection();
}

export function type(type) {
  let types = ['blog', 'event', 'subject', 'question', 'debate', 'poll', 'belief', 'quote'];
  this.params.page = 1;
  if (this.params.exclude.length === 7) {
    this.params.exclude = [];
  } else {
    let index = types.indexOf(type);
    if (index !== -1) {
      types.splice(index, 1);
      this.params.exclude = types;
    }
  }
  this.posts = [];
  this._collection();
}

export function context(type, id) {
  this.params.page = 1;
  this.params.context = {
    type: type,
    id: id,
    profile: {}
  };
  dispatch({context: this.params.context});
  this.posts = [];
  // create
  if (type === 'create') {
    let model = {id: 'create', title: '', content: '', user: {}};
    this.posts = [model];
    dispatch({posts: this.posts, total: this.posts.length, params: this.params, scroll: this.scroll});
    return;
  }
  // no context
  if (type === null) {
    this._collection();
    return;
  }
  // post || edit
  if (type === 'post' || type === 'edit') {
    this._single(id);
    return;
  }

  // me
  if (type === 'me') {
    //this.params.context.profile = data;
    dispatch({context: this.params.context});
    this._collection();
    return;
  }
  // users/orgs
  let profile = users;
  if (type === 'org') {
    profile = orgs;
  }
  profile.single(id)
    .then(data => {
      this.params.context.profile = data;
      this.params.context.id = data.id;
      dispatch({context: this.params.context});
      this._collection();
    })
    .catch(code => {
      if (code != 200) {
         let alert = {
           action: 'profile',
           color: 'red',
           code: code,
           msg: 'Could not load posts for this profile'
         };
         dispatch({alert: alert});
         console.warn(alert);
      }
    });
}

export function folder(id) {
  this.posts = null;
  this.params.page = 1;
  this.params.folder = id;
  this._collection();
}

export function save(postId, folderId) {
  let remove = false;
  let folder = folderId;
  if (folderId === 0 && this.params.folder > 0) {
    remove = true;
    folder = this.params.folder;
  }
  folders.folder(postId, folder, remove)
  .then(data => {
    if (remove) {
      this._folder(folder);
    }
  })
  .catch(code => {
    let alert = {
      action: 'save',
      color: 'red',
      code: code,
      msg: 'Could not save to folder'
    };
    dispatch({alert: alert});
    console.warn(alert);
  });
}
