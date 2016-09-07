import React from 'react';
import Info from './info';
import Orgs from './organizations';

import styles from './styles.less'

export default React.createClass({
  render: function () {
    return (
      <div className="account">
        <h2>My Account</h2>
        <Info />
        <Orgs />
      </div>
    );
  }
});
