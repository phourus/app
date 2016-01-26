"use strict";
let React = require('react');

let Router = require('react-router');
let { Link, History } = Router;
let ga = require('../analytics');

let AccountActions = require('../actions/account');
let AccountStore = require('../stores/account');
let StreamActions = require('../actions/stream');
let StreamStore = require('../stores/stream');

module.exports = React.createClass({
  mixins: [History],
  getInitialState: function () {
    return {
      filter: false,
      orgs: [],
      logout: false
    };
  },
  componentDidMount: function () {
    this.unsubscribeAccount = AccountStore.listen(data => {
      if (!data.user && this.state.logout === true) {
        this.history.pushState(null, "/home");
        data.logout = false;
      }
      this.setState(data);
    });
    this.unsubscribeStream = StreamStore.listen(data => {
      this.setState(data);
    });
    AccountActions.orgs();
  },
  componentWillUnmount: function () {
    this.unsubscribeAccount();
    this.unsubscribeStream();
  },
  componentWillReceiveProps: function (updated) {
    if (!updated.tint) {
      this.setState({filter: false});
    }
  },
  render: function () {
    let orgs = this.state.orgs;
    let route = this.props._route;
    let r = route.root;
    if (r === 'home') {
      return <Home />
    }
    if (['contact', 'pricing', 'about', 'docs'].indexOf(r) > -1) {
      return <Static />
    }
    return  (
        <header className="header">
          { AccountStore.authenticated
            ?  <nav className="nav">
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
                    <div>
                      <ul>
                        {orgs.map((org) => {
                          if (!org.approved) {
                            return false;
                          }
                          return <li key={org.org.id}><Link to={`stream/org/${org.org.id}`}>{org.org.shortname || org.org.name} <i className="fa fa-users" /></Link></li>
                        })}
                      </ul>
                      <ul>
                        <li><Link to="stream/me">My Posts <i className="fa fa-edit" /></Link></li>
                        <li><Link to="activity">My Activity <i className="fa fa-bell" /></Link></li>
                        <li><Link to="account">My Account <i className="fa fa-user" /></Link></li>
                        <li><a href="javascript:void(0)" onClick={this._logout}>Logout <i className="fa fa-sign-out" /></a></li>
                      </ul>
                    </div>
                  </li>
                  <li className="create">
                    <Link to="stream/create">
                      <i className="fa fa-pencil" />
                      Create
                    </Link>
                  </li>
                </ul>
              </nav>
              : <nav>
                  <ul>
                    <li className="create">
                      <Link to="home">
                        <i className="fa fa-sign-in" />
                        Login
                      </Link>
                    </li>
                  </ul>
                </nav>
          }
          <div className="brand">
            <Link to="home"></Link>
          </div>
          <Search {...this.state.params} filter={this._filter} />
          {this.state.filter && this.props.tint ? <Filter {...this.state.params} tint={this.props.tint} close={this._filter} /> : false}
        </header>
    );
  },
  _logout: function () {
    this.setState({logout: true});
    AccountActions.logout();
    ga('send', 'event', 'account', 'logout');
  },
  _filter: function () {
    if (this.state.filter !== true) {
      this.props.tintOn();
      this._redirect();
    } else {
      this.props.tintOff();
    }
    this.setState({filter: !this.state.filter});
  },
  _redirect: function () {
    let route = this.props._route;
    if (route.root !== 'stream') {
      this.history.pushState(null, '/stream');
    }
  }
});

let Home = React.createClass({
  render: function () {
    return (
      <header className="header home">
        <div className="brand">
          <Link to="home"></Link>
        </div>
        <Nav classType="home" />
      </header>
    );
  }
});

let Static = React.createClass({
  render: function () {
    return (
      <header className="header">
        <div className="brand">
          <Link to="home"></Link>
        </div>
        <Nav classType="static" />
      </header>
    );
  }
});

let Nav = React.createClass({
  render: function () {
    return (
      <nav className={this.props.classType}>
        <ul>
          <li><Link to="about">About</Link></li>
          <li><Link to="pricing">Pricing</Link></li>
          <li><Link to="docs">Docs</Link></li>
          <li><Link to="contact">Contact</Link></li>
        </ul>
      </nav>
    );
  }
});

let Search = React.createClass({
  getInitialState: function () {
    return {
      search: ""
    };
  },
  componentDidMount: function () {
    this.setState({search: this.props.search});
  },
  componentWillReceiveProps: function (updated, current) {
    if (updated.search !== current.search) {
      this.setState({search: updated.search});
    }
  },
	render: function () {
		return (
  		<div className="keywords">
  			<input className="term" type="text" placeholder="Search for" value={this.state.search} onChange={this._change} />
        <button className="filter fa fa-filter" onClick={this.props.filter}></button>
  			<button className="button blue" onClick={this._search}><i className="fa fa-search" /> Search</button>
  		</div>
		);
	},
  _change: function (e) {
    this.setState({search: e.currentTarget.value});
  },
	_search: function () {
		StreamActions.search(this.state.search);
	},
});

let Filter = React.createClass({
	// <button className="clear">
	// 	Clear All <i className="fa fa-close" />
	// </button>
	// <button className="apply">
	// 	Apply <i className="fa fa-check" />
	// </button>
	render: function () {
		return (
			<div className="filter">
				<Filter.Types {...this.props} close={this.props.close} />
        <Filter.Sort {...this.props} />
			</div>
		);
	},
	toggleFilter: function (e) {
		let id = e.currentTarget.id;
		let prop = id + "Visible";
		let obj = {};
		let visibility = this.state[prop] == true ? false : true;
		obj[prop] = visibility;
		StreamActions.type(obj);
	}
});

Filter.Dates = React.createClass({
	render: function () {
		return (
			<div className="dates">
				<div>
					<label>From:</label>
					<button><i className="fa fa-calendar" /></button>
					<input />
				</div>
				<div>
					<label>To:</label>
					<button><i className="fa fa-calendar" /></button>
					<input />
				</div>
			</div>
		);
	}
});

Filter.Types = React.createClass({
	render: function () {
    let exclude = this.props.exclude || [];
		var classes = {
			blog: "type blog",
			event: "type event",
			subject: "type subject",
			question: "type question",
			debate: "type debate",
			poll: "type poll",
			belief: "type belief",
			quote: "type quote"
		};
		for (var i = 0; i < exclude.length; i++) {
			var key = exclude[i];
			classes[key] += " inverted";
		}
		return (
			<div className="types">
        <div className="label">Toggle Types</div>
				<div id="blog" className={classes.blog} onClick={this._toggle}><i className="fa fa-laptop" /> Blogs</div>
				<div id="event" className={classes.event} onClick={this._toggle}><i className="fa fa-calendar" /> Events</div><br />
				<div id="subject" className={classes.subject} onClick={this._toggle}><i className="fa fa-info" /> Subjects</div>
				<div id="question" className={classes.question} onClick={this._toggle}><i className="fa fa-question" /> Questions</div><br />
				<div id="debate" className={classes.debate} onClick={this._toggle}><i className="fa fa-bullhorn" /> Debates</div>
				<div id="poll" className={classes.poll} onClick={this._toggle}><i className="fa fa-bar-chart" /> Polls</div><br />
				<div id="belief" className={classes.belief} onClick={this._toggle}><i className="fa fa-flag" /> Beliefs</div>
				<div id="quote" className={classes.quote} onClick={this._toggle}><i className="fa fa-quote-right" /> Quotes</div><br /><br />
        <div>
          <button className="button red" style={{width: '240px'}} onClick={this.props.close}>Close <i className="fa fa-close" /></button>
        </div>
			</div>
		);
	},
	_toggle: function (e) {
		let type = e.currentTarget.id;
		StreamActions.exclude(type);
	}
});

Filter.Categories = React.createClass({
	getInitialState: function () {
		return {
			element: 'blogs',
			category: '',
			subcategory: ''
		}
	},
	render: function () {
		let categories = [];
		let subcategories = [];
		categories = Tax[this.state.element];

		if (this.state.element === 'blogs') {
			categories = Tax.blogs.world;
		}
		if (this.state.element === 'subjects') {
			categories = Tax.subjects.category;
			subcategories = Tax.subjects[this.state.category || Tax.subjects.category[0].value];
		}
		if (this.state.element === 'debates') {
			categories = Tax.debates.category;
			subcategories = [];
		}
		if (this.state.element === 'beliefs') {
			categories = Tax.beliefs.category;
			subcategories = [];
		}
		return (
			<div className="categories">
				<div className="toggles">
					<button className="button blue">Select All</button>
					<button className="button red">Select None</button>
				</div>
				<ul>
					<li><a id="blogs" href="javascript:void(0)" onClick={this._changeElement}>Blogs & Events</a></li>
					<li><a id="subjects" href="javascript:void(0)" onClick={this._changeElement}>Subjects & Questions</a></li>
					<li><a id="debates" href="javascript:void(0)" onClick={this._changeElement}>Debates & Polls</a></li>
					<li><a id="beliefs" href="javascript:void(0)" onClick={this._changeElement}>Beliefs & Quotes</a></li>
				</ul>
				<ul>
					{categories.map((item) => {
						return <li><a id={item.value} href="javascript:void(0)" onClick={this._changeCategory}>{item.label}</a></li>
					})}
				</ul>
				<ul>
					{subcategories.map((item) => {
						return <li><a id={item.value} href="javascript:void(0)" onClick={this._changeCategory}>{item.label}</a></li>
					})}
				</ul>
			</div>
		);
	},
	_changeElement: function (e) {
		let id = e.currentTarget.id;
		this.setState({element: id});
	},
	_changeCategory: function (e) {
		let id = e.currentTarget.id;
		this.setState({category: id});
	}
});

Filter.Sort = React.createClass({
	render: function () {
    // <li className={(this.props.sortBy === 'location') ? "selected" : ""} onClick={this._location}><i className={"fa " + (this.props.sortBy === 'location' ? "fa-check" : "fa-globe")} /> Location</li>
    // <li className={(this.props.sortBy === 'date') ? "selected" : ""} onClick={this._date}><i className={"fa " + (this.props.sortBy === 'date' ? "fa-check" : "fa-calendar")} /> Date</li>
		return (
			<div className="sortby">
				<div className="triangle"></div>
				<div className="label">Sort by</div>
				<ul className="sort" ref="sort">
					<li className={(this.props.sortBy === 'influence') ? "selected" : ""} onClick={this._influence}><i className={"fa " + (this.props.sortBy === 'influence' ? "fa-check" : "fa-trophy")} /> Influence</li>
					<li className={(this.props.sortBy === 'totalViews') ? "selected" : ""} onClick={this._views}><i className={"fa " + (this.props.sortBy === 'totalViews' ? "fa-check" : "fa-eye")} /> Views</li>
					<li className={(this.props.sortBy === 'popularity') ? "selected" : ""} onClick={this._popularity}><i className={"fa " + (this.props.sortBy === 'popularity' ? "fa-check" : "fa-smile-o")} /> Popularity</li>
					<li className={(this.props.sortBy === 'totalThumbs') ? "selected" : ""} onClick={this._thumbs}><i className={"fa " + (this.props.sortBy === 'totalThumbs' ? "fa-check" : "fa-thumbs-up")} /> Thumbs</li>
					<li className={(this.props.sortBy === 'totalComments') ? "selected" : ""} onClick={this._comments}><i className={"fa " + (this.props.sortBy === 'totalComments' ? "fa-check" : "fa-comment")} /> Comments</li>
				</ul>
				<div className="direction"  ref="direction">
					<button className={(this.props.direction === 'DESC') ? 'selected' : ''} onClick={this._desc}>
							<i className="fa fa-arrow-down" /> High to Low
					</button>
					<button className={(this.props.direction === 'ASC') ? 'selected' : ''} onClick={this._asc}>
						<i className="fa fa-arrow-up" /> Low to High
					</button>
				</div>
			</div>
		);
	},
	_influence: function (e) { StreamActions.sortBy('influence'); },
	_views: function (e) { StreamActions.sortBy('totalViews'); },
	_popularity: function (e) { StreamActions.sortBy('popularity'); },
	_thumbs: function (e) { StreamActions.sortBy('totalThumbs'); },
	_comments: function (e) { StreamActions.sortBy('totalComments'); },
	_location: function (e) { StreamActions.sortBy('location'); },
	_date: function (e) { StreamActions.sortBy('date'); },
	_asc: function (e) { StreamActions.direction('ASC'); },
	_desc: function (e) { StreamActions.direction('DESC'); },
});
