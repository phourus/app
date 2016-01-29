"use strict";
let React = require('react');
let { render } = require('react-dom');
let ga = require('./analytics');

let { Router } = require('react-router');
let createBrowserHistory = require('history/lib/createBrowserHistory');
let history = createBrowserHistory();
history.listen((loc) => {
  ga('send', 'pageview', loc.pathname);
});

let routes = require('./routes');
let el = document.getElementById("app");

render(<Router routes={routes} history={history} />, el);
