let React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="information">
        <h2>Centralize Research & Information</h2>
        <p>Improving access to information can help yield anywhere from a 38-600%
          return on investment. How often is your team looking for information
          they can't find and recreating documents that already exist? According
          to the following statistics, on average knowledge workers lose:</p>
        <a href="">How inefficient is your knowledge management? &raquo;</a>
        <div className="stat">
          <img src="/assets/landing/searching.png" />
          <h3>3.7 hours lost per week</h3>
          <p>inefficient content search</p>
        </div>
        <div className="stat">
          <img src="/assets/landing/time.png" />
          <h3>2.5 hours lost per week</h3>
          <p>inefficient content search</p>
        </div>
        <div className="stat">
          <img src="/assets/landing/cost.png" />
          <h3>$10k+ lost per year</h3>
          <p>per knowledge worker</p>
        </div>
      </div>
    )
  }
})
