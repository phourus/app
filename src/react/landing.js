"use strict";
if (typeof module !== 'undefined' && module.exports) {
    var React = require('react');
}
/**
* @jsx React.DOM
*/
var Landing = React.createClass({
     render: function () {
          return React.DOM.h1(null, 'Landing Page');
     }
});
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Landing;
} else{
    var cnt = document.getElementById('content');
    React.renderComponent(Landing({}), cnt);
}
