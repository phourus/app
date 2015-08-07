"use strict";
let React = require('react');

let About = React.createClass({
  render: function () {
    return (
      <div className="about">
        <img src="/assets/banner.jpg" className="banner" />
        <div className="description">
          <p>For individuals, a free tool to express themselves professionally, educationally, politically and religiously; a place where expression and representation meet.</p>
          <p>For organizations, such as businesses, government agencies, religious/charitable organizations and educational institutions, Phourus is a tool to create valuable content both internally and externally, with a competitive, social spin with the purpose of giving higher visibility to great content.</p>
        </div>
        <div className="help">

        </div>
        <div className="basics">
          <h2>How does it work?</h2>
          <button>
            <i className="fa fa-user-plus" /><br />
            Sign Up
          </button>
          <button className="selected">
            <i className="fa fa-edit" /><br />
            Create Posts
          </button>
          <button>
            <i className="fa fa-bar-chart" /><br />
            Interact
          </button>
          <button>
            <i className="fa fa-trophy" /><br />
            Rank
          </button>
          <div className="details">
            <br />
            <h2 className="title">What kind of posts can I create on Phourus?</h2>
            <p>Each element of Phourus has two post types to choose from:</p>
            <div>
              <i className="" />
              <h3>Blogs & Events</h3>
              <p>General posts and real-life events</p>
            </div>
            <div>
              <i className="" />
              <h3>Subjects & Questions</h3>
              <p>Educational posts and Q&A</p>
            </div>
            <div>
              <i className="" />
              <h3>Debates & Polls</h3>
              <p>Polarized discussions and survey-style polling</p>
            </div>
            <div>
              <i className="" />
              <h3>Beliefs & Quotes</h3>
              <p>Deep-seated thoughts and meaningful quotes</p>
            </div>
          </div>
        </div>
        <div className="integrations">
          <h2>Integrations</h2>
          <i className="fa fa-facebook" />
          <i className="fa fa-dropbox" />
          <i className="fa fa-linkedin" />
          <i className="fa fa-slack" />
          <i className="fa fa-google" />
          <i className="fa fa-rss" />
        </div>
        <div className="contact">
          <h2>Contact Us</h2>
          <div></div>
          <div>
            <i className="fa fa-map-marker" /><br />
            Phourus Inc.
            1411 7th St #305
            Santa Monica, CA 90401
          </div>
          <div>
            <i className="fa fa-phone" /><br />
            1-800-PHOURUS
            1-800-746-8787
            <a href="mailto:info@phourus.com">info@phourus.com</a>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
});

module.exports = About;
