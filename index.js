"use strict";
var config = require("./config");
var babel = require('babel/register');
var fs = require('fs');
var express = require('express');
var React = require('react');
var api = require('./api/rest');
var Router = require('react-router');

var routes = require('./src/routes');

var phourus = express();

phourus.use(express.static(__dirname + '/build'));
phourus.use('/rest', api);

phourus.get('*', function(req, res){
  var file, app, out;
  file = fs.readFileSync('build/app.html', 'utf8');
  Router.run(routes, req.url, function (Handler) {
    var app = React.renderToString(React.createElement(Handler, null));
    out = file.replace('$APP', app);
    res.send(out, 200);
  });
});

phourus.listen(config.get('port'), function(){
    console.log('server started');
});
