"use strict";
import pages from '../rest/pages'

export function get(page) {
  return (dispatch) => {
    pages.get(page)
    .then(data => {
      dispatch({type: 'RECEIVE_PAGE', page: data, id: page});
    })
    .catch(code => {
      if (code != 200) {
        let alert = {
          action: 'load',
          color: 'yellow',
          code: code,
          msg: 'Page could not be loaded'
        };
        dispatch({type: 'ALERT', alert});
        console.warn(alert);
      }
    });
  }
}
