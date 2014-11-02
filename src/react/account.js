/** PROFILE **/
// Pic, Stats, Game, Contact

/** VIEWS **/
// History, Notifications, Groups, Org Accounts
if(typeof module !== 'undefined' && module.exports){
    var React = require('react');
}
/**
* @jsx React.DOM
*/
var Account = React.createClass({
     render: function() {
          return React.DOM.h1(null, 'Account Page');
     }
});
if(typeof module !== 'undefined' && module.exports){
    module.exports = Account;
}else{
    var cnt = document.getElementById('content');
    React.renderComponent(Account({}), cnt);
}
