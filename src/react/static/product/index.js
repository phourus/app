import React from 'react'

import Contribute from './contribute'
import Thoughts from './thoughts'
import Recognition from './recognition'
import Features from './features'
import Integrate from './integrate'

import styles from './styles.less'

module.exports = React.createClass({
  render: function () {
    return (
      <div className="product">
        <Contribute />
        <div className="spacer" />
        <Thoughts />
        <div className="spacer" />
        <Recognition />
        <div className="spacer" />
        <Features />
        <div className="spacer" />
        <Integrate />
      </div>
    );
  }
});
