"use strict";
if (typeof module !== 'undefined' && module.exports) {
    var React = require('react');
}
/**
* @jsx React.DOM
*/
var Profile = React.createClass({
     render: function () {
          return React.DOM.h1(null, 'Profile');
     }
});
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Profile;
} else{
    var cnt = document.getElementById('content');
    React.renderComponent(Profile({}), cnt);
}
