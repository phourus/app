// Form, Help
if(typeof module !== 'undefined' && module.exports){
    var React = require('react');
}
/**
* @jsx React.DOM
*/
var Editor = React.createClass({
     render: function() {
          return React.DOM.h1(null, 'Editor');
     }
});
if(typeof module !== 'undefined' && module.exports){
    module.exports = Editor;
}else{
    var cnt = document.getElementById('content');
    React.renderComponent(Editor({}), cnt);
}
