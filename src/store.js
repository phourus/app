import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import tutorial from './reducers/tutorial'

const reducers = combineReducers({
  tutorial
})

const store = Store()

export default function Store(initialState) {
  return createStore(
    reducers,
    initialState,
    applyMiddleware(thunkMiddleware, createLogger())
  )
}
