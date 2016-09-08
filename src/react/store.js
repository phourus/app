import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

import * as reducers from './reducers'
import sagas from './sagas'

const store = createStore(
  combineReducers(reducers),
  {},
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(sagas)

export default store
