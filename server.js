"use strict";
var fs = require('fs');
var express = require('express');
var React = require('react');
require('node-jsx').install();
var App = require('./src/app');

var phourus = express();

phourus.use(express.static(__dirname + '/build'));

phourus.get('*', function(req, res){
    var file, app, out;
    file = fs.readFileSync('build/index.html', 'utf8');
    app = React.renderToString(App({path: req.path}));
    out = file.replace('$APP', app);
    res.send(out, 200);
});

phourus.listen(4567, function(){
    console.log('server started');
});