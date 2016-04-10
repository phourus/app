let React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="contribute">
        <h2>Make your mark and contribute your story</h2>
        <p>Get to know the people you work with and see how they contribute.
        Influence metrics help you stick out of the crowd and quickly find
        content deemed valuable by your peers</p>
        <img src="/assets/product/contribute.png" />
        <button className="button blue">Start your story</button>
      </div>
    )
  }
})
