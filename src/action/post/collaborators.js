"use strict";
import collaborators from '../../api/collaborators'

export function collection(postId) {
  this.postId = postId;
  collaborators.collection(postId)
  .then(data => {
    this.trigger({list: data});
  })
  .catch(code => {
    let alert = {
      action: 'collection',
      color: 'red',
      code: code,
      msg: 'Collaborators could not be loaded'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}

export function add(model) {
  collaborators.add(model)
  .then(data => {
    this._refresh();
  })
  .catch(code => {
    let alert = {
      action: 'add',
      color: 'red',
      code: code,
      msg: 'Collaborator could not be added'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}

export function remove(type, id) {
  collaborators.remove(type, id)
  .then(data => {
    this._refresh();
  })
  .catch(code => {
    let alert = {
      action: 'remove',
      color: 'red',
      code: code,
      msg: 'Collaborator could not be removed'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}

export function lookup(orgId) {
  collaborators.lookup(orgId)
  .then(data => {
    this.trigger({lookup: data});
  })
  .catch(code => {
    let alert = {
      action: 'lookup',
      color: 'red',
      code: code,
      msg: 'Lookup could not be loaded'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}

export function refresh() {
  this._collection(this.postId);
}
