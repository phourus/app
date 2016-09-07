import React from 'react';
import Tabs from './tabs';

import styles from './styles.less'

export default React.createClass({
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
