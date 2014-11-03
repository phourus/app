"use strict";
// Leaderboards, Milestones
if (typeof module !== 'undefined' && module.exports) {
    var React = require('react');
}
/**
* @jsx React.DOM
*/
var Game = React.createClass({
     render: function () {
          return React.DOM.h1(null, 'Game');
     }
});
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Game;
} else{
    var cnt = document.getElementById('content');
    React.renderComponent(Game({}), cnt);
}
