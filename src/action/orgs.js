"use strict";
import orgs from '../api/orgs'

export function change(key, value) {
  this.changes[key] = value;
  this.trigger({changes: this.changes});
}

export function create(shortname) {
  orgs.add(shortname)
  .then(data => {
    this.trigger({org: data});
  })
  .catch(code => {
    this.trigger({code: code});
    let alert = {
      action: 'organization',
      color: 'red',
      code: code,
      msg: 'Organization could not be created'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}

export function single(id) {
  orgs.single(id)
    .then(data => {
      this.trigger({org: data});
    })
    .catch(code => {
      if (code != 200) {
        let alert = {
          action: 'load',
          color: 'red',
          code: code,
          msg: 'Organization could not be loaded'
        };
        this.trigger({alert: alert});
        console.warn(alert);
      }
    });
}

export function save() {
  orgs.save(this.org.id, this.changes)
    .then(data => {
      this._single(id);
    })
    .catch(code => {
      if (code != 200) {
         let alert = {
           action: 'save',
           color: 'red',
           code: code,
           msg: 'Organization details could not be saved'
         };
         this.trigger({alert: alert});
         console.warn(alert);
      }
    });
}

export function lookup(name) {
  orgs.lookup(name)
  .then(data => {
    this.trigger({lookup: data});
  })
  .catch(code => {
    this.trigger({code: code});
    let alert = {
      action: 'lookup',
      color: 'yellow',
      code: code,
      msg: 'Organizations lookup could not be loaded'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}

export function deactivate() {
  // orgs.deactivate
  // .then(code => {
  //   if (code == 202) {
  //     msg('green', 'Account deactivated', code);
  //     let alert = {
  //       action: 'deactivate',
  //       color: 'green',
  //       code: code,
  //       msg: 'Account deactivated'
  //     };
  //     this.trigger({alert: alert});
  //   }
  // })
  // .catch(code => {
  //   this.trigger({code: code});
  //   let alert = {
  //     action: 'deactivate',
  //     color: 'red',
  //     code: code,
  //     msg: 'Account could not be deactivated'
  //   };
  //   this.trigger({alert: alert});
  //   console.warn(alert);
  // });
}
