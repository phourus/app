"use strict";
let React = require('react');
let Router = require('react-router');
let Link = Router.Link;

let About = React.createClass({
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
          <h3>Pricing</h3>
          <p>For individuals, a free tool to express themselves professionally, educationally, politically and religiously; a place where expression and representation meet.</p>
          <p>For organizations, such as businesses, government agencies, religious/charitable organizations and educational institutions, Phourus is a tool to create valuable content both internally and externally, with a competitive, social spin with the purpose of giving higher visibility to great content.</p>
        </div>
        <div className="help">
          <h3>Have questions or need help?</h3>
          <button className="button blue">Contact Support</button>
          <p>1-800-PHOURUS</p>
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
        <div className="screenshots">
          <div>
            <img src="/assets/screenshots/stream.png" alt="Phourus Stream Screenshot" />
            <h3>Discover Content</h3>
            <p>...using the Phourus Stream with advanced searching and filtering capability</p>
            <div style={{clear: "both"}}></div>
          </div>
          <div>
            <img src="/assets/screenshots/editor.png" className="left" alt="Phourus Editor Screenshot" />
            <h3>Create Posts</h3>
            <p>...on a variety of topics with rich text, file attachments and detailed metadata</p>
            <div style={{clear: "both"}}></div>
          </div>
          <div>
            <img src="/assets/screenshots/comments.png" alt="Phourus Comments Screenshot" />
            <h3>Interact</h3>
            <p>...with the Phourus community by viewing posts and commenting, voting and sharing</p>
            <div style={{clear: "both"}}></div>
          </div>
          <div>
            <img src="/assets/screenshots/editor.png" className="left" alt="Phourus Compete Screenshot" />
            <h3>Compete</h3>
            <p>...to become a respected Leader by contributing to the Phourus platform</p>
            <div style={{clear: "both"}}></div>
          </div>
        </div>
        <div className="platforms"></div>
        <div className="integrations">
          <br />
          <h2>Integrations</h2>
          <br />
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
            Phourus Inc.<br />
            1411 7th St #305<br />
            Santa Monica, CA 90401
          </div>
          <div>
            <i className="fa fa-phone" /><br />
            1-800-PHOURUS<br />
            1-800-746-8787<br />
          <a href="mailto:info@phourus.com?Subject=Support">info@phourus.com</a>
          </div>
          <div></div>
        </div>
      </div>
    );
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
  render: function () {
    return (
      <div className="signup">
        <br />
        <h2 className="title">How do I get started?</h2>
        <p>It's as simple as signing up! Simply register with your email, fill out your profile and start using Phourus today.</p>
        <div>
          <i className="fa fa-user" />
          <h3>Sign up as an Individual</h3>
          <button className="button blue">Sign Up Now</button>
        </div>
        <div>
          <i className="fa fa-users" />
          <h3>Sign up as an Organization</h3>
          <button className="button blue">Sign Up Now</button>
        </div>
        <p>Already have an account with Phourus? <Link to="account">Click here to login.</Link></p>
      </div>
    )
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
          <h3>Blogs & Events</h3>
          <p>General posts and real-life events</p>
        </div>
        <div>
          <i className="fa fa-question" />
          <h3>Subjects & Questions</h3>
          <p>Educational posts and Q&A</p>
        </div>
        <div>
          <i className="fa fa-bullhorn" />
          <h3>Debates & Polls</h3>
          <p>Polarized discussions and survey-style polling</p>
        </div>
        <div>
          <i className="fa fa-quote-right" />
          <h3>Beliefs & Quotes</h3>
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
          <h3>View</h3>
          <p>View a post if it piques your interest or is respected by the community</p>
        </div>
        <div>
          <i className="fa fa-comment" />
          <h3>Comment</h3>
          <p>Join the discussion to provide feedback, good or bad, to the post's author</p>
        </div>
        <div>
          <i className="fa fa-thumbs-up" />
          <h3>Vote</h3>
          <p>Upvote or downvote to alter the Influence and visibility of a post</p>
        </div>
        <div>
          <i className="fa fa-share" />
          <h3>Share</h3>
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
          <h3>Influence</h3>
          <p>Users, posts and organizations earn Influence points based on positive community feedback</p>
        </div>
        <div>
          <i className="fa fa-trophy" />
          <h3>Leaders</h3>
          <p>Top-rated users, posts and organizations are featured on the Leaders page</p>
        </div>
      </div>
    )
  }
});

module.exports = About;
