let React = require('react');

let Contribute = require('./product/contribute');
let Thoughts = require('./product/thoughts');
let Recognition = require('./product/recognition');
let Features = require('./product/features');
let Integrate = require('./product/integrate');

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
