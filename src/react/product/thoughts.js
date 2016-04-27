let React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="thoughts">
        <h2>Stream your thoughts in multiple ways</h2>
        <div className="slides"><img src="/assets/product/slider.png" /></div>
        <p>Use blogs and ideas to share your general thoughts</p>
        <div className="posts">
          <img src="/assets/product/post.png" />
        </div>
        <div className="stream">
          <img src="/assets/product/thoughts.png" />
        </div>
      </div>
    )
  }
})
