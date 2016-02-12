'use strict';
let React = require('react');

let Tabs = require('./admin/tabs');

module.exports = React.createClass({
  render: function () {
    let route = this.props._route;

    return (
      <div className="admin">
        <Tabs {...this.state} _route={route} />
        {React.cloneElement(this.props.children, route)}
      </div>
    );
  }
});
