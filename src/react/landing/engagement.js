let React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="engagement">
        <div className="scale"></div>
        <h2>The Key to Engagement</h2>
        <h4>Maslow's Hierarchy of Needs</h4>
        <div className="gradient">
          <img src="/assets/landing/gradient.png" />
        </div>
        <h3>Survival</h3>
        <h4>Unengaged</h4>
        <p>Employee's purpose in the company is based on fulfilling psychological needs.</p>
        <div className="pyramid">
          <img src="/assets/landing/pyramid.png" />
        </div>
        <ul className="quotes">
          <li>"I just need a paycheck"</li>
          <li>"I just want to leave"</li>
          <li>"What I do doesn't matter"</li>
          <li>"Work is a burden"</li>
        </ul>
        <h3>Low engagement results in:</h3>
        <div className="result">
          <i className="fa fa-arrow-up" />
          <span>37%</span>
          <p>more absenteeism</p>
        </div>
        <div className="result">
          <i className="fa fa-arrow-down" />
          <span>49%</span>
          <p>more accidents</p>
        </div>
        <div className="result">
          <i className="fa fa-arrow-down" />
          <span>16%</span>
          <p>lower profitability</p>
        </div>
        <div className="result">
          <i className="fa fa-arrow-down" />
          <span>37%</span>
          <p>lower job growth</p>
        </div>
      </div>
    )
  }
})
