"use strict";

export function ready(ready) {
  this.trigger({ready: ready});
}

export function reset() {
  this.trigger({reset: true});
}
