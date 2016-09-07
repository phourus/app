let React = require('react');

let Tabs = require('./tabs');

import styles from './styles.less'

module.exports = React.createClass({
  contextTypes: {
    route: React.PropTypes.object
  },
  render: function () {
    let route = this.context.route;

    return (
      <div className="admin">
        <Tabs {...this.state} />
        {React.cloneElement(this.props.children, route)}
      </div>
    );
  }
});
