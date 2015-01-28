"use strict";
var fs = require('fs');
var express = require('express');
var React = require('react');
require('node-jsx').install();
var App = require('./src/app');

var phourus = express();

phourus.use(express.static(__dirname + '/build'));

phourus.get('*', function(req, res){
    var file, markup, out;
    file = fs.readFileSync('build/template.html', 'utf8');
    console.log(req.path);
    markup = React.renderComponentToString(App({path: req.path}));
    out = file.replace('$CONTENT', markup);
    res.send(out, 200);
});

phourus.listen(4567, function(){
    console.log('server started');
});