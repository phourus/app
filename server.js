"use strict";
var babel = require('babel/register');
var fs = require('fs');
var express = require('express');
var React = require('react');
var Router = require('react-router');

var routes = require('./src/routes');

var phourus = express();

phourus.use(express.static(__dirname + '/build'));

phourus.get('*', function(req, res){
    var file, app, out;
    file = fs.readFileSync('build/index.html', 'utf8');
    Router.run(routes, req.url, function (Handler) {
        var app = React.renderToString(React.createElement(Handler, null));
        out = file.replace('$APP', app);
        res.send(out, 200);
    });
});

phourus.listen(4567, function(){
    console.log('server started');
});
