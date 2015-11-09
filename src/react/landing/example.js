"use strict";
let React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="example">
        <h1>Communicate Flawlessly</h1>
        <div className="squeeze">
          <div className="left">
            <div className="quote">
              <img src="/assets/landing/jesse.png" />
              <div className="employee">
                <strong>Jesse Drelick</strong>
                <div className="title">CEO, Phourus</div>
              </div>
              <p>I agree with this statement. If we're clever enough and put the effort in we can reach profitability without any outside capital.</p>
            </div>
            <div className="quote">
              <p>I also agree with this statement, but think execution is even more important than ideas, capital and experience.</p>
              <img src="/assets/landing/matt.png" />
              <div className="employee">
                <strong>Matt Leddy</strong>
                <div className="title">COO, Phourus</div>
              </div>
            </div>
          </div>
          <div className="image">
            <img src="/assets/landing/post.png" />
          </div>
          <div className="right">
            <div className="quote">
              <div className="employee">
                <strong>Jen Wong</strong>
                <div className="title">UX Consultant, Phourus</div>
              </div>
              <img src="/assets/landing/jen.png" />
              <p>I think this is highly dependent upon the industry, product, and market, but still a nice sentiment!</p>
            </div>
            <div className="quote">
              <p>It's going to have to be one great idea to not take a million dollars instead!</p>
              <div className="employee">
                <strong>Jennie Kim</strong>
                <div className="title">Marketing Intern, Phourus</div>
              </div>
              <img src="/assets/landing/jennie.png" />
            </div>
          </div>
        </div>
      </div>
    );
  }
});
