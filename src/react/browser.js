"use strict";
import React from 'react'
import { render } from 'react-dom'
import ga from '../lib/analytics'

import { Router, browserHistory } from 'react-router'
// let createBrowserHistory = require('history/lib/createBrowserHistory');
// let history = createBrowserHistory();
// history.listen((loc) => {
//   ga('send', 'pageview', loc.pathname);
// });

import routes from '../routes'
let el = document.getElementById("app");

//history={browserHistory}
render(<Router routes={routes} />, el);
