"use strict";
var config = require("./config");
var babel = require('babel/register');
var fs = require('fs');
var express = require('express');
var React = require('react');
var ReactDOM = require('react-dom/server');
var api = require('./api/rest');
var Router = require('react-router');
var match = Router.match;
var RoutingContext = Router.RoutingContext;

var routes = require('./src/routes');

var phourus = express();

var App = require('./src/app');

phourus.use(express.static(__dirname + '/build'));
phourus.use('/rest', api);

phourus.get('*', function(req, res){
  var file, app, out;
  file = fs.readFileSync('build/app.html', 'utf8');
  //Router.Router.run(routes, req.url, function (Handler) {
    //var app = React.renderToString(React.createElement(App, null));
    //out = file.replace('$APP', ReactDOM.render(app));
    res.send(file, 200);
  //});
  // match({ routes: routes, location: req.url }, function (error, redirectLocation, renderProps) {
  //   if (error) {
  //     //res.status(500).send(error.message)
  //   } else if (redirectLocation) {
  //     //res.redirect(302, redirectLocation.pathname + redirectLocation.search)
  //   } else if (renderProps) {
  //     var el = React.createElement(RoutingContext, renderProps);
  //     res.status(200).send(ReactDOM.renderToString(el));
  //   } else {
  //     //res.status(404).send('Not found')
  //   }
  // });
});

phourus.listen(config.get('port'), function(){
    console.log('server started');
});
