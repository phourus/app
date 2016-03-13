"use strict";
import folders from '../../api/folders'

export function collection() {
  folders.collection({})
  .then(data => {
    this.trigger({folders: data});
  })
  .catch(code => {
    if (code != 200) {
     let alert = {
       action: 'collection',
       color: 'red',
       code: code,
       msg: 'Folders could not be loaded'
     };
     this.trigger({alert: alert});
     console.warn(alert);
    }
  });
}

export function add(model) {
  folders.add(model)
  .then(data => {
    this.trigger({added: data});
  })
  .catch(code => {
    let alert = {
      action: 'add',
      color: 'red',
      code: code,
      msg: 'Folder could not be created'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}

export function remove(id) {
  folders.remove(id)
  .then(data => {
    this.trigger({removed: id});
  })
  .catch(code => {
    let alert = {
      action: 'remove',
      color: 'red',
      code: code,
      msg: 'Folder could not be removed'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}
