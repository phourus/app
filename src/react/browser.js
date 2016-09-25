import React from 'react'
import { render } from 'react-dom'
import ga from '../lib/analytics'

import { Router, browserHistory } from 'react-router'
// let createBrowserHistory = require('history/lib/createBrowserHistory');
// let history = createBrowserHistory();
// history.listen((loc) => {
//   ga('send', 'pageview', loc.pathname);
// });

import { Provider } from 'react-redux'
import store from './store'

import routes from '../routes'
const el = document.getElementById("app")

if (module.hot) {
  module.hot.accept()
  render(<Provider store={store}><Router history={browserHistory} routes={routes} /></Provider>, el)
}
