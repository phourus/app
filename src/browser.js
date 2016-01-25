"use strict";
let React = require('react');
let { render } = require('react-dom');
let Routes = require('./routes');

// Router.HistoryLocation
//ga('send', 'pageview', state.path);
render(Routes, document.getElementById("app"));
