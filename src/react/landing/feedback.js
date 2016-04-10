let React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="feedback">
        <h2>Get better feedback</h2>
        <p>For two-fold returns</p>
        <img src="/assets/landing/bad.png" />
        <img src="/assets/landing/good.png" />
      </div>
    )
  }
})
