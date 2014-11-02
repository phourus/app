if(typeof module !== 'undefined' && module.exports){
    var React = require('react');
}
/** MAP **/
// Location filter, overlays

/** FILTERS **/
// Groups, Types, Sort, Search, Pagination

/** STREAM **/
// iPost
/**
* @jsx React.DOM
*/
var Home = React.createClass({
     componentDidMount: function(){       
         var self = this;
         $.ajax({
             url: "/data",
             success: function(data){
                 self.setProps(data);
             },
             failure: function(err){
                 console.log(err);
             }
         });
     },
     render: function() {
          return React.DOM.h1(null, 'Home');
     }
});
if(typeof module !== 'undefined' && module.exports){
    module.exports = Home;
}else{
    var cnt = document.getElementById('content');
    React.renderComponent(Home({}), cnt);
}
