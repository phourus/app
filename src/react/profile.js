"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, History } = Router;

let UserStore = require('../stores/users');
let UserActions = require('../actions/profile').User;

let OrgStore = require('../stores/orgs');
let OrgActions = require('../actions/profile').Org;

let PostStore = require('../stores/post');
let PostActions = require('../actions/post');

let Pic = require('./shared/pic');
let Uploader = require('./shared/uploader');

module.exports = React.createClass({
	mixins: [History],
	contextTypes: {
		session: React.PropTypes.object,
		route: React.PropTypes.object
	},
  getInitialState: function () {
    return {
			profile: null
    };
  },
	componentDidMount: function () {
		this.unsubscribeUser = UserStore.listen((data) => {
			this.setState({profile: data});
		});
		this.unsubscribeOrg = OrgStore.listen((data) => {
			this.setState({profile: data});
		});
		this.unsubscribePosts = PostStore.listen((data) => {
			let post = data.post || {};
			if (post.org) {
				this.setState({profile: post.org, type: 'org'});
			} else if (post.user) {
				this.setState({profile: post.user, type: 'user'});
			}
		});
		this._load(this.context.route);
	},
	componentWillUnmount: function () {
		this.unsubscribeUser();
		this.unsubscribeOrg();
		this.unsubscribePosts();
	},
	componentWillReceiveProps: function (nextProps) {
		// if (nextProps._route) {
		// 	this._load(nextProps._route);
		// }
	},
	render: function () {
		let profile = this.state.profile || {};
		let address = profile.address || {};
		let root = this.context.route.root;
		let type = this.context.route.type;
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
					? <Uploader img={profile.img} />
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
	_load: function (route) {
		let root = route.root;
		let type = route.type;
		let id = route.id;
		// ADMIN
		if (root === 'admin' && id > 0) {
			OrgActions.single(id);
		}
		// ACCOUNT
		if (root === 'account') {
			let session = this.context.session;
			this.setState({profile: session.user});
		}
		// STREAM
		if (root === 'stream') {
			if (type === 'user') {
				UserActions.single(id);
			}
			if (type === 'org') {
				OrgActions.single(id);
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
