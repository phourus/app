"use strict";
let React = require('react');

let Influence = React.createClass({
    render: function () {
      let range = Math.ceil(this.props.influence / 10);
      return (
        <div className={`influence influence${range}`}>
          <i className="fa fa-certificate" /> {this.props.influence}
        </div>
      );
    }
});

module.exports = Influence;
