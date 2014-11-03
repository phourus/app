"use strict";
// terms, privacy
if (typeof module !== 'undefined' && module.exports) {
    var React = require('react');
}
/**
* @jsx React.DOM
*/
var General = React.createClass({
     render: function () {
          return React.DOM.h1(null, 'General Page');
     }
});
if (typeof module !== 'undefined' && module.exports) {
    module.exports = General;
} else{
    var cnt = document.getElementById('content');
    React.renderComponent(General({}), cnt);
}
