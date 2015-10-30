"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, Navigation } = Router;

let Actions = require('../../actions/stream');

module.exports = React.createClass({
	mixins: [Navigation],
	render: function () {
		let classes = {
			phourus: "fa fa-flag",
			organizations: "fa fa-users",
			users: "fa fa-user"
		};
		if (!this.props.type) {
			classes.phourus += ' selected';
		}
		if (this.props.type === 'userPosts') {
			classes.users += ' selected';
		}
		if (this.props.type === 'orgPosts' || this.props.type === 'orgs') {
			classes.organizations += ' selected';
		}
		// <button className={classes.phourus} onClick={this._phourus}> Phourus</button>
		// <button className={classes.organizations} onClick={this._organizations}> Orgs</button>
		// <button className={classes.users} onClick={this._users}> Users</button>
		return (
			<div className="context"></div>
		);
	},
	_phourus: function () {
		this.context.router.transitionTo("stream");
	},
	_organizations: function () {
		this.context.router.transitionTo("orgs");
	},
	_users: function () {
		this.context.router.transitionTo("users");
	}
});

let _Context = React.createClass({
	getDefaultProps: function () {
		return {
			id: null,
			type: null,
			profile: null
		}
	},
	render: function () {
		let label = 'Viewing all public Phourus posts';
		let img = '/assets/logos/logo-emblem.png';
		let clear = false;
		let clearLink = <span> | Clear filters <Link to="stream" className="close">x</Link></span>;
		let link = false;
		let name = '';
		if (this.props.profile) {
			name = this.props.profile.username || this.props.profile.shortname || '';
		}
		if (true === 'user is logged in') {
			link = <Link to="myPosts">Click here to view your posts</Link>
		} else {
			link = <Link to="account">Click here to create posts</Link>
		}
		if (this.props.type === 'myPosts') {
			label = 'Viewing all my posts:';
			clear = clearLink;
			img = '/assets/avatars/' + (this.props.profile.img || 'default') + '.jpg';
			link = <Link to="account">View my account</Link>
		}
		if (this.props.type === 'userPosts') {
			label = 'Viewing posts by:';
			img = '/assets/avatars/' + (this.props.profile.img || 'default') + '.jpg';
			clear = clearLink;
			link = <Link to="user" params={{id: this.props.id}}>{name}</Link>
		}
		if (this.props.type === 'orgPosts') {
			label = 'Viewing posts by:';
			img = '/assets/orgs/' + (this.props.profile.img || 'default') + '.jpg';
			clear = clearLink;
			link = <Link to="user" params={{id: this.props.id}}>{name}</Link>
		}
		return (
			<div className="context">
				<img src={img} />
				{label}<br />
			  {link} {clear}
			</div>
		);
	},
	_clear: function () {
		Actions.context(null, null);
	}
});
