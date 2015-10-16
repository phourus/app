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
  getInitialState: function () {
    return {
      orgs: []
    };
  },
  componentDidMount: function () {
    this.unsubscribeAccount = AccountStore.listen(data => {
      this.setState(data);
    });
    this.unsubscribePost = PostStore.listen(data => {
      if (data.add === true) {
        this.transitionTo("edit", {id: data.post.id});
      }
    });
    AccountActions.orgs();
  },
  componentWillUnmount: function () {
    this.unsubscribeAccount();
    this.unsubscribePost();
  },
  render: function () {
    let orgs = this.state.orgs;
    return  (
        <header className="header">
          <div className="brand">
            <Link to="home"></Link>
          </div>
          <Search />
          <nav className="nav">
            <ul>
              <li className="posts">
                <Link to="stream" >
                  <i className="fa fa-file" />
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
                    <li><Link to="myPosts">My Posts <i className="fa fa-edit" /></Link></li>
                    {orgs.map((org) => {
                      if (!org.approved) {
                        return false;
                      }
                      return <li><Link to="orgPosts" params={{id: org.org.id}}>{org.org.shortname} <i className="fa fa-users" /></Link></li>
                    })}
                    <li><Link to="activity">My Activity <i className="fa fa-bell" /></Link></li>
                    <li><Link to="account">My Account <i className="fa fa-user" /></Link></li>
                    <li><a href="javascript:void(0)" onClick={AccountActions.logout}>Logout <i className="fa fa-sign-out" /></a></li>
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

let Search = React.createClass({
	getInitialState: function () {
		return { mode: false };
	},
	render: function () {
		let popup = '';
		if (this.state.mode === 'filter') {
			popup = <Filter {...this.props.params} />
		}
		if (this.state.mode === 'sort') {
			popup = <Sort {...this.props.params} />
		}
		//<button className="fa fa-sort" onClick={this._sort}> Sort</button>
		return (
  		<div className="keywords">
  			<input ref="term" className="term" type="text" placeholder="Search for" />
        <button className="filter fa fa-filter" onClick={this._filter}></button>
  			<button className="button blue" onClick={this._search}><i className="fa fa-search" /> Search</button>
  		</div>
		);
	},
	_search: function () {
			let val = this.refs.term.getDOMNode().value;
			Actions.search(val);
	},
	_filter: function () {
		if (this.state.mode === 'filter') {
			this.setState({mode: false});
		} else {
			this.setState({mode: 'filter'});
		}
	},
	_sort: function () {
		if (this.state.mode === 'sort') {
			this.setState({mode: false});
		} else {
			this.setState({mode: 'sort'})
		}
	}
});

module.exports = Header;
