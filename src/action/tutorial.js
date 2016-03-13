"use strict";

export function ready(ready) {
  return (dispatch) => {
    dispatch({type: 'TUTORIAL_READY', ready});
  }
}

export function reset() {
  return (dispatch) => {
    dispatch({type: 'TUTORIAL_RESET', reset: true});
  }
}
