"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, History } = Router;

let Store = require('../stores/profile');
let Actions = require('../actions/profile');

let AccountStore = require('../stores/account');
let AccountActions = require('../actions/account');
let PostStore = require('../stores/post');
let PostActions = require('../actions/post');
let Pic = require('./shared/pic');
let Uploader = require('./shared/uploader');

let Profile = React.createClass({
	mixins: [History],
  getInitialState: function () {
    return {
			context: {
				root: '',
				type: '',
				id: 0
			},
			profile: null
    };
  },
	componentDidMount: function () {
		this.unsubscribe = Store.listen((data) => {
			this.setState({profile: data});
		});
		this.unsubscribeAccount = AccountStore.listen((data) => {
			if (data.action === 'get' && data.user) {
				this.setState({profile: data.user});
			}
		});
		this.unsubscribePosts = PostStore.listen((data) => {
			let post = data.post || {};
			if (post.org) {
				this.setState({profile: post.org});
			} else if (post.user) {
				this.setState({profile: post.user});
			}
		});
		this._context();
	},
	componentWillUnmount: function () {
		this.unsubscribe();
		this.unsubscribeAccount();
		this.unsubscribePosts();
	},
	componentWillReceiveProps: function () {
		this._context();
	},
	render: function () {
		let profile = this.state.profile || {};
		let address = profile.address || {};
		if (this.state.context.type === 'post') {
			profile = this.state.profile || {};
		}
		if (['stream', 'account', 'admin'].indexOf(this.state.context.root) === -1) {
			return false;
		}
		if (this.state.context.root === 'stream' && !this.state.context.type) {
			return false;
		}
		if (this.state.context.type === 'post' && !this.props.postMode) {
			return false;
		}
		if (this.state.context.type === 'edit') {
			return false;
		}
		return (
			<div className="profile">
				{this.state.context.root === 'account' || this.state.context.root === 'admin'
					? <Uploader img={profile.img} context={this.state.context} />
					: <Pic img={profile.img} context={this.state.context} />
				}
				<div className="basic">
					<h1 className="name">{profile.name || profile.first + ' ' + profile.last}</h1>
					{address.city || address.state ? <div>{address.city}{address.city && address.state ? ", " : ""}{address.state}</div> : false}
					{profile.website ? <div><a href={profile.website} target="_blank">{profile.website}</a></div> : false}
					{profile.phone ? <div>{profile.phone}</div> : false}
					{profile.email ? <div><a href={"mailto:" + profile.email + "&Subject=Phourus"}>{profile.email}</a></div> : false}
				</div>
				<div className="detail">
					<div className={profile.type + " type"}>{profile.type ? profile.type.toUpperCase() : ""}</div>
				</div>
			</div>
		);
	},
	_back: function () {
		this.history.pushState(null, "/stream");
	},
	_context: function () {
		/** CONTEXT **/
		// NONE
		// /stream
		// USER
		// /stream/user/:id
		// ORG
		// /stream/org/:id
		// /admin/:id/*
		// ME
		// /account/*
		// /stream/create
		// /stream/edit/:id
		// POST
		// /stream/:id

		let route = this.props.routes;
		let params = this.props.params;
		let context = {
			root: null,
			type: null,
			id: null
		};

		if (route[1]) {
			context.root = route[1].name;
		}
		if (route[2]) {
			context.type = route[2].name;
		}
		if (params.id) {
			context.id = params.id;
		}
		this._load(context);
		this.setState({context: context});
	},
	_load: function (context) {
		// ADMIN
		if (context.root === 'admin' && context.id > 0) {
			Actions.Org.single(context.id);
		}
		// ACCOUNT
		if (context.root === 'account') {
			AccountActions.get();
		}
		// STREAM
		if (context.root === 'stream') {
			if (context.type === 'me' || context.type === 'create' || context.type === 'edit') {
				AccountActions.get();
			}
			if (context.type === 'users') {
				Actions.User.single(context.id);
			}
			if (context.type === 'orgs') {
				Actions.Org.single(context.id);
			}
		}
	}
});

let Basic = React.createClass({
  render: function () {
    let address = this.props.org.address || {};
    return (
      <div className="basic">
        <div className="name">{this.props.org.name}</div>
        <div className={this.props.org.type + " type"}>{this.props.org.type.toUpperCase()}</div>
        {address.city || address.state ? <div>{address.city}{address.city && address.state ? ", " : ""}{address.state}</div> : false}
        {this.props.org.website ? <div><a href={this.props.org.website} target="_blank">{this.props.org.website}</a></div> : false}
        {this.props.org.phone ? <div>{this.props.org.phone}</div> : false}
        {this.props.org.email ? <div><a href={"mailto:" + this.props.org.email + "&Subject=Phourus"}>{this.props.org.email}</a></div> : false}
      </div>
    );
  }
});

module.exports = Profile;
