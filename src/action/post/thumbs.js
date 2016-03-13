"use strict";
import thumbs from '../../api/thumbs'

export function post(id) {
  this.postId = id;
  thumbs.post(id)
  .then(data => {
    if (data) {
      this.trigger(data);
    }
  })
  .catch(code => {
    let alert = {
      action: 'load',
      color: 'red',
      code: code,
      msg: 'Thumbs could not be loaded'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}

export function add(model) {
  thumbs.add(model)
  .then(data => {
    this._post(this.postId);
  })
  .catch(code => {
    let alert = {
      action: 'add',
      color: 'red',
      code: code,
      msg: 'Thumb could not be added'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}

export function save(id, model) {
  thumbs.save(id, model)
  .then(data => {
    this._post(this.postId);
  })
  .catch(code => {
    let alert = {
      action: 'save',
      color: 'red',
      code: code,
      msg: 'Thumb could not be saved'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}

export function remove(id) {
  thumbs.remove(id)
  .then(data => {
    this.trigger({id: null, positive: null});
  })
  .catch(code => {
    let alert = {
      action: 'remove',
      color: 'red',
      code: code,
      msg: 'Thumb could not be removed'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}
