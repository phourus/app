"use strict";
let React = require('react');
let { render } = require('react-dom');

let routes = require('./routes');
let el = document.getElementById("app");

render(routes, el);
