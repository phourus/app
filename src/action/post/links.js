"use strict";
import links from '../../api/links'

export function add(model) {
  links.add(model)
  .then(data => {
    this.trigger({id: null, title: '', url: '', caption: '', mode: null, added: data});
  })
  .catch(code => {
    this.trigger({code: code, action: 'add'});
    let alert = {
      action: 'add',
      color: 'red',
      code: code,
      msg: 'Link could not be created'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}

export function save(id, model) {
  links.save(id, model)
  .then(data => {
    this.trigger({id: null, title: '', url: '', caption: '', mode: null, saved: data});
  })
  .catch(code => {
    //this.trigger({code: code, action: 'save'});
    let alert = {
      action: 'save',
      color: 'red',
      code: code,
      msg: 'Link could not be saved'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}

export function remove(id) {
  links.remove(id)
  .then(data => {
    this.trigger({removed: id});
  })
  .catch(code => {
    //this.trigger({code: code, action: 'remove'});
    let alert = {
      action: 'remove',
      color: 'red',
      code: code,
      msg: 'Link could not be removed'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}
