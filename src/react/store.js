import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

import * as reducers from './reducers'
import sagas from './sagas'

const store = createStore(
  combineReducers(reducers),
  {},
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
sagaMiddleware.run(sagas)

export default store
