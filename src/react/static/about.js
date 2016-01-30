"use strict";
let React = require('react');
let Router = require('react-router');
let { History, Link } = Router;

let About = React.createClass({
  mixins: [History],
  getInitialState: function () {
    return {
      mode: "signup"
    }
  },
  render: function () {
    let classes = {
      signup: "",
      create: "",
      interact: "",
      rank: ""
    };
    let views = {
      signup: <Signup />,
      create: <Create />,
      interact: <Interact />,
      rank: <Rank />
    };
    classes[this.state.mode] = "selected";
    return (
      <div className="about">
        <img src="/assets/banner.jpg" className="banner" alt="Phourus About Banner Image" />
        <div className="description">
          <h3>What is Phourus?</h3>
          <p>Phourus is about people and the organizations they are part of. Between payroll and the time spent recruiting, engaging and retaining employees, the people of a company are it's biggest investment.</p>
          <p>Phourus it the only platform focused on nurturing the thoughts, ideas and opinions of employees and keeping them in a central, secure place for easy access and collaboration</p>
        </div>
        <div className="help">
          <h3>Have questions or need help?</h3>
          <button className="button blue" onClick={this._contact}>Contact Support</button>
          <p>1-844-PHOURUS</p>
          <a href='mailto:info@phourus.com?Subject=Support'>info@phourus.com</a>
        </div>
        <div className="basics">
          <h2>How does it work?</h2>
          <button className={classes.signup} onClick={this._signup}>
            <i className="fa fa-user-plus" /><br />
            Sign Up
          </button>
          <button className={classes.create} onClick={this._create}>
            <i className="fa fa-edit" /><br />
            Create Posts
          </button>
          <button className={classes.interact} onClick={this._interact}>
            <i className="fa fa-bar-chart" /><br />
            Interact
          </button>
          <button className={classes.rank} onClick={this._rank}>
            <i className="fa fa-trophy" /><br />
            Rank
          </button>
          <div className="details">{views[this.state.mode]}</div>
        </div>
        <div className="team">
          <h2 className="title">The Phourus Team</h2>
          <p>Based out of Santa Monica CA, Phourus is a small, agile team working together to improve employee relationships.</p>
          <div>
            <img src="/assets/landing/jesse.png" alt="Phourus Team - Jesse Drelick" />
            <h3>Jesse Drelick</h3>
            <p>Technology and product</p>
            <div style={{clear: "both"}}></div>
          </div>
          <div>
            <img src="/assets/landing/matt.png" className="left" alt="Phourus Team - Matt Leddy" />
            <h3>Matt Leddy</h3>
            <p>Sales and account management</p>
            <div style={{clear: "both"}}></div>
          </div>
          <div>
            <img src="/assets/landing/jen.png" alt="Phourus Team - Jennifer Wong" />
            <h3>Jennifer Wong</h3>
            <p>UX and analytics</p>
            <div style={{clear: "both"}}></div>
          </div>
          <div>
            <img src="/assets/landing/edwin.png" className="left" alt="Phourus Team - Edwin Chu" />
            <h3>Edwin Chu</h3>
            <p>Business development and lead generation</p>
            <div style={{clear: "both"}}></div>
          </div>
        </div>
        <div className="contact">
          <h2>Contact Us</h2>
          <div></div>
          <div>
            <i className="fa fa-map-marker" /><br />
            Phourus Inc.<br />
            1411 7th St #305<br />
            Santa Monica, CA 90401
          </div>
          <div>
            <i className="fa fa-phone" /><br />
            1-844-PHOURUS<br />
            1-844-746-8787<br />
          <a href="mailto:info@phourus.com?Subject=Support">info@phourus.com</a>
          </div>
          <div></div>
        </div>
      </div>
    );
  },
  _contact: function () {
    this.history.pushState(null, "/contact");
  },
  _signup: function () {
    this.setState({mode: 'signup'});
  },
  _create: function () {
    this.setState({mode: 'create'});
  },
  _interact: function () {
    this.setState({mode: 'interact'});
  },
  _rank: function () {
    this.setState({mode: 'rank'});
  }
});

let Signup = React.createClass({
  mixins: [History],
  render: function () {
    return (
      <div className="signup">
        <br />
        <h2 className="title">How do I get started?</h2>
        <p>It's as simple as signing up! Simply register with your email, fill out your profile and start using Phourus today.</p>
        <div>
          <i className="fa fa-user" />
          <h3 className="title">Sign up as an Individual</h3>
          <button className="button blue" onClick={this._register}>Sign Up Now</button>
        </div>
        <div>
          <i className="fa fa-users" />
          <h3 className="title">Sign up as an Organization</h3>
          <button className="button blue" onClick={this._trial}>Start Trial</button>
        </div>
        <p>Already have an account with Phourus? <Link to="/home">Click here to login.</Link></p>
      </div>
    )
  },
  _register: function () {
    this.history.pushState(null, "/home");
  },
  _trial: function () {
    this.history.pushState(null, "/home");
  }
});

let Create = React.createClass({
  render: function () {
    return (
      <div className="create">
        <br />
        <h2 className="title">What kind of posts can I create on Phourus?</h2>
        <p>Each element of Phourus has two post types to choose from:</p>
        <div>
          <i className="fa fa-laptop" />
          <h3 className="title">Blogs & Events</h3>
          <p>General posts and real-life events</p>
        </div>
        <div>
          <i className="fa fa-question" />
          <h3 className="title">Subjects & Questions</h3>
          <p>Educational posts and Q&A</p>
        </div>
        <div>
          <i className="fa fa-bullhorn" />
          <h3 className="title">Debates & Polls</h3>
          <p>Polarized discussions and survey-style polling</p>
        </div>
        <div>
          <i className="fa fa-quote-right" />
          <h3 className="title">Beliefs & Quotes</h3>
          <p>Deep-seated thoughts and meaningful quotes</p>
        </div>
      </div>
    )
  }
});

let Interact = React.createClass({
  render: function () {
    return (
      <div className="interact">
        <br />
        <h2 className="title">How do I participate?</h2>
        <p>It's easy to participate on Phourus with common social features like commenting, voting and sharing.</p>
        <div>
          <i className="fa fa-eye" />
          <h3 className="title">View</h3>
          <p>View a post if it piques your interest or is respected by the community</p>
        </div>
        <div>
          <i className="fa fa-comment" />
          <h3 className="title">Comment</h3>
          <p>Join the discussion to provide feedback, good or bad, to the post's author</p>
        </div>
        <div>
          <i className="fa fa-thumbs-up" />
          <h3 className="title">Vote</h3>
          <p>Upvote or downvote to alter the Influence and visibility of a post</p>
        </div>
        <div>
          <i className="fa fa-share" />
          <h3 className="title">Share</h3>
          <p>Help increase a post's visibility and points the most by sharing</p>
        </div>
      </div>
    )
  }
});

let Rank = React.createClass({
  render: function () {
    return (
      <div className="rank">
        <br />
        <h2 className="title">How do I compete?</h2>
        <p>Earn points on Phourus to increase your visibility and credibility</p>
        <div>
          <i className="fa fa-star" />
          <h3 className="title">Influence</h3>
          <p>Users, posts and organizations earn Influence points based on positive community feedback</p>
        </div>
        <div>
          <i className="fa fa-trophy" />
          <h3 className="title">Leaders</h3>
          <p>Top-rated users, posts and organizations are featured on the Leaders page</p>
        </div>
      </div>
    )
  }
});

module.exports = About;
