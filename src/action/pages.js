"use strict";
import pages from '../rest/pages'

export function get(page) {
  pages.get(page)
  .then(data => {
    this.trigger({page: data, id: page});
  })
  .catch(code => {
    if (code != 200) {
      let alert = {
        action: 'load',
        color: 'yellow',
        code: code,
        msg: 'Page could not be loaded'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    }
  });
}
