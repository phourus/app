var express = require('express');
var React = require('react');
var jsx = require('node-jsx').install();

var fs = require('fs');

var phourus = express();



phourus.get('', function(req, res){
    var template = fs.readFile('build/index.html', 'utf8', function(err, out){
        //var component = renderComponent('landing');
        //out = out.replace('$CONTENT', component);
        res.send(out, 200);
    });   
});

var respond = function(req, res){
    var id, out;
    id = req.route.path;
    parts = id.split('/');
    out = compile(parts[1]);
    res.send(out, 200);
}

phourus.get('/home', respond);
phourus.get('/post/:id', respond);
phourus.get('/editor', respond);
phourus.get('/profile/:id', respond);
phourus.get('/account', respond);
phourus.get('/game', respond);
phourus.get('/general', respond);


var compile = function(id){
    var out;
    var file = fs.readFileSync('build/template.html', 'utf8');
    var component = renderComponent(id);
    file = file.replace('$CONTENT', component);
    file = file.replace('$SCRIPT', '<script type="text/javascript" src="react/' + id + '.js"></script>');
    return file;   
}

phourus.get('/data', function(req, res){
    var out = {};
    out.title = "Test AJAX";
    out.content = "Worked";
    res.send(out, 200);
});

//phourus.all('', function(req, res) { res.redirect(__dirname); });
phourus.use('', express.static(__dirname + '/build'));

function renderComponent(id){
    var component = require('./build/react/' + id);
    return React.renderToString(component());    
}


phourus.listen(4567, function(){
    console.log('server started');
});