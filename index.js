var config = require("./config");
var fs = require('fs');
var express = require('express');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var match = Router.match;

var api = require('./api/rest');
// var routes = require('./src/routes');
// var server = require('./src/react/server');

var phourus = express();

process.on('uncaughtException', function (err) {
  console.log("---UNCAUGHT EXCEPTION---");
  console.error(err);
});

phourus.use(express.static(__dirname));
phourus.use('/rest', api);

// phourus.get('*', renderServer);
//
// function renderServer (req, res) {
//   match({ routes: routes, location: req.url }, function (error, redirectLocation, renderProps) {
//     if (error) {
//       //res.status(500).send(error.message)
//     } else if (redirectLocation) {
//       //res.redirect(302, redirectLocation.pathname + redirectLocation.search)
//     } else if (renderProps) {
//       var el = React.createElement(server, renderProps);
//       res.status(200).send(ReactDOM.renderToString(el));
//     } else {
//       //res.status(404).send('Not found')
//     }
//   });
// }

phourus.listen(config.get('port'), function(){
    console.log('server started');
});
