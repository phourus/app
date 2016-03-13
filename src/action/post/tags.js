"use strict";
import tags from '../../api/tags'

export function add(model) {
  tags.add(model)
  .then(data => {
    this.trigger({added: data});
  })
  .catch(code => {
    let alert = {
      action: 'add',
      color: 'red',
      code: code,
      msg: 'Tag could not be created'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}

export function remove(id) {
  tags.remove(id)
  .then(data => {
    this.trigger({removed: id});
  })
  .catch(code => {
    let alert = {
      action: 'remove',
      color: 'red',
      code: code,
      msg: 'Tag could not be removed'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}
