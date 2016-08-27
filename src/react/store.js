import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

import post from './post/redux/reducer'

import sagas from './sagas'

const reducers = combineReducers({
  post
})

const store = createStore(
  reducers,
  {},
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(sagas)

export default store
