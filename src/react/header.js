"use strict";
let React = require('react');

let Router = require('react-router');
let { Link, RouteHandler, Navigation } = Router;

let PostActions = require('../actions/post');
let PostStore = require('../stores/post');
let AccountActions = require('../actions/account');
let AccountStore = require('../stores/account');

let Header = React.createClass({
  mixins: [Navigation],
  componentDidMount: function () {
    this.unsubscribeAccount = AccountStore.listen(data => {
      this.setState(data);
    });
    this.unsubscribePost = PostStore.listen(data => {
      if (data.add === true) {
        this.transitionTo("edit", {id: data.post.id});
      }
    });
  },
  componentWillUnmount: function () {
    this.unsubscribeAccount();
    this.unsubscribePost();
  },
  render: function () {
    return  (
        <header className="header">
          <div className="brand">
            <Link to="home"></Link>
          </div>
          <nav className="nav">
            <ul>
              <li className="posts">
                <Link to="stream" >
                  <i className="fa fa-search" />
                  Posts
                </Link>
              </li>
              <li className="me">
                <Link to="activity" className="me">
                  <i className="fa fa-user" />
                  <span className="notifications"></span>
                  Me
                </Link>
                {AccountStore.authenticated
                  ? <ul>
                    <li><Link to="myPosts">My Posts</Link></li>
                    <li><Link to="activity">My Activity</Link></li>
                    <li><Link to="account">My Account</Link></li>
                    <li><a href="javascript:void(0)" onClick={AccountActions.logout}>Logout</a></li>
                  </ul>
                  : false
                }
              </li>
              <li className="create">
                <a href="javascript: void(0)" onClick={this._create}>
                  <i className="fa fa-pencil" />
                  Create
                </a>
              </li>
            </ul>
          </nav>
        </header>
    );
  },
  _create: function () {
    if (!AccountStore.authenticated) {
      this.context.router.transitionTo("account");
    } else {
      PostActions.add();
    }
  }
});

module.exports = Header;
