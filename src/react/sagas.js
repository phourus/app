import { spawn } from 'redux-saga/effects'

import account from './account/redux/saga'
import activity from './activity/redux/saga'
import admin from './admin/redux/saga'
import auth from './auth/redux/saga'
import tutorial from './shared/tutorial/redux/saga'
import general from './static/redux/saga'
import post from './post/redux/saga'
import stream from './stream/redux/saga'

export default function* sagas() {
  yield [
    spawn(account),
    spawn(activity),
    spawn(admin),
    spawn(auth),
    spawn(tutorial),
    spawn(general),
    spawn(post),
    spawn(stream)
  ]
}
