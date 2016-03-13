"use strict";
import comments from '../../api/comments'

export function collection(params) {
  this.params = params;
  comments.collection(params)
  .then(data => {
    this.trigger(data);
  })
  .catch(code => {
    let alert = {
      action: 'collection',
      color: 'yellow',
      code: code,
      msg: 'Comments could not be loaded'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}

export function add(model) {
  comments.add(model)
  .then(data => {
    this.trigger({added: data});
  })
  .catch(code => {
    let alert = {
      action: 'add',
      color: 'red',
      code: code,
      msg: 'Comment could not be created'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}

export function save(id, model) {
  comments.save(id, model)
  .then(data => {
    this.trigger({saved: data});
  })
  .catch(code => {
    let alert = {
      action: 'save',
      color: 'red',
      code: code,
      msg: 'Comment could not be updated'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}

export function remove(id) {
  comments.remove(id)
  .then(data => {
    this.trigger({removed: id});
  })
  .catch(code => {
    let alert = {
      action: 'remove',
      color: 'red',
      code: code,
      msg: 'Comment could not be removed'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}
