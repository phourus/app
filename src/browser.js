"use strict";
var React = require('react');  
var Router = require('react-router');
var routes = require('./routes');

try {
  Router.run(routes, function (Handler) {
      React.render(<Handler />, Router.HistoryLocation, document.getElementById("app"));
  });  
} catch (e) {
    console.error(e);
}