"use strict";
let React = require('react');

let Influence = React.createClass({
    render: function () {
      let range = Math.ceil(this.props.influence / 10);
      return (
        <div className={`influence influence${range}`}>
          <div className="score">{this.props.influence}</div>
          <div>Influence</div>
        </div>
      );
    }
});

module.exports = Influence;
