"use strict";
let React = require('react');
let { render } = require('react-dom');

let routes = require('./routes');
let el = document.getElementById("app");

// Router.HistoryLocation
//ga('send', 'pageview', state.path);
render(routes, el);

// var match = Router.match;
// var RoutingContext = Router.RoutingContext;
// var history = Router.browserHistory;
// var location = Router.location;
//
// function track(){
//   console.log('GA');
// }
//
// match({ routes, location }, (error, redirectLocation, renderProps) => {
//   render(<Router {...renderProps} history={history} />, mountNode)
// })
// render(<Router onUpdate={track} routes={routes} history={history} />, el)
