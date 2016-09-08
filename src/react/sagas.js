import { spawn } from 'redux-saga/effects'

import post from './post/redux/saga'
import stream from './stream/redux/saga'

export default function* sagas() {
  yield [
    spawn(post),
    spawn(stream)
  ]
}
