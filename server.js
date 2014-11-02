var express = require('express');
var React = require('react');
var jsx = require('node-jsx').install();

var fs = require('fs');

var phourus = express();

phourus.get('/stream', function(req, res){
    var template = fs.readFile('build/template.html', 'utf8', function(err, out){
        var component = renderComponent('home');
        out = out.replace('$CONTENT', component);
        out = out.replace('$SCRIPT', '<script type="text/javascript" src="react/home.js"></script>');
        res.send(out, 200);
    });   
});

phourus.get('/data', function(req, res){
    var out = {};
    out.title = "Test AJAX";
    out.content = "Worked";
    res.send(out, 200);
});

function renderComponent(id){
    var component = require('./build/react/' + id);
    return React.renderToString(component());    
}

phourus.use(express.static('./build'));
phourus.listen(4567, function(){
    console.log('server started');
});