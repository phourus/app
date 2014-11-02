if(typeof module !== 'undefined' && module.exports){
    var React = require('react');
}
/**
* @jsx React.DOM
*/
var Sidebar = React.createClass({
     componentDidMount: function(){       
         var token = 1;
     },
     render: function() {
          return React.DOM.h1(null, 'Sidebar');
     }
});
var Guest = React.createClass({
    
});
var User = React.createClass({
    
});
var Post = React.createClass({
    
});

if(typeof module !== 'undefined' && module.exports){
    module.exports = Sidebar;
}else{
    var cnt = document.getElementById('content');
    React.renderComponent(Sidebar({}), cnt);
}
