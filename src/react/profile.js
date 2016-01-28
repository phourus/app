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
				this.setState({profile: post.org, type: 'org'});
			} else if (post.user) {
				this.setState({profile: post.user, type: 'user'});
			}
		});
		this._load();
	},
	componentWillUnmount: function () {
		this.unsubscribe();
		this.unsubscribeAccount();
		this.unsubscribePosts();
	},
	componentWillReceiveProps: function () {
		this._load();
	},
	render: function () {
		let profile = this.state.profile || {};
		let address = profile.address || {};
		let root = this.props._route.root;
		let type = this.props._route.type;
		if (type === 'post') {
			profile = this.state.profile || {};
		}
		if (['stream', 'account', 'admin'].indexOf(root) === -1) {
			return false;
		}
		if (root === 'stream' && !type) {
			return false;
		}
		if (type === 'post' && !this.props.postMode) {
			return false;
		}
		if (type === 'edit' || type === 'create') {
			return false;
		}
		return (
			<div className="profile">
				{root === 'account' || root === 'admin'
					? <Uploader img={profile.img} _route={this.props._route} />
					: <Pic id={profile.id} img={profile.img} type={this.state.type} name={this.state.type === 'org' ? profile.shortname : profile.username} />
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
	_load: function () {
		let root = this.props._route.root;
		let type = this.props._route.type;
		let id = this.props._route.id;
		// ADMIN
		if (root === 'admin' && id > 0) {
			Actions.Org.single(id);
		}
		// ACCOUNT
		if (root === 'account') {
			AccountActions.get();
		}
		// STREAM
		if (root === 'stream') {
			if (type === 'me' || type === 'create' || type === 'edit') {
				AccountActions.get();
			}
			if (type === 'user') {
				Actions.User.single(id);
			}
			if (type === 'org') {
				Actions.Org.single(id);
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
