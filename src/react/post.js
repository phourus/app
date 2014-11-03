"use strict";
/** POST **/
// Post, Author

/** INTERACT **/
// Views, Comments, Likes
if (typeof module !== 'undefined' && module.exports) {
    var React = require('react');
}
/**
* @jsx React.DOM
*/
var Post = React.createClass({
     render: function () {
          return React.DOM.h1(null, 'Post');
     }
});
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Post;
} else{
    var cnt = document.getElementById('content');
    React.renderComponent(Post({}), cnt);
}
