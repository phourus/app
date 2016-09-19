import { call, put, take, spawn } from 'redux-saga/effects'

export default function* init() {
  yield [
    spawn(ready),
    spawn(reset)
  ]
}

function* ready(ready) {
  //this.trigger({ready: ready});
}

function* reset() {
  //this.trigger({reset: true});
}
