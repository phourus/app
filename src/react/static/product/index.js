let React = require('react');

let Contribute = require('./contribute');
let Thoughts = require('./thoughts');
let Recognition = require('./recognition');
let Features = require('./features');
let Integrate = require('./integrate');

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
