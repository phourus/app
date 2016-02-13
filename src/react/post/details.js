"use strict";
let React = require('react');
let Router = require('react-router');
let { Link } = Router;
let moment = require('moment');

let Pic = require('../shared/pic');
let Poll = require('./poll');

module.exports = React.createClass({
	contextTypes: {
		route: React.PropTypes.object
	},
	getDefaultProps: function () {
		return {
			user: {
				id: 0
			},
			post: {
				org: {}
			},
			location: {}
		};
	},
	render: function () {
		let route = this.context.route;
		let context = 'user';
		let profileName = "Phourus User";
		let org = {};
		let link = '';
		if (this.props.post.user && this.props.post.user.id && this.props.post.user.id != 0) {
			let user = this.props.post.user;
			if (user.username) {
				profileName = user.username;
			}
			if (user.first && user.last) {
				profileName = user.first + " " + user.last;
			}
		}
		if (this.props.post.org && this.props.post.org.id && this.props.post.org.id != 0) {
			org = this.props.post.org;
			profileName = org.shortname;
			link = route.createOrgLink(profileName);
			context = 'org';
		}
		return (
			<div className="details">
				<Pic id={context === 'org' ? org.shortname : this.props.user.username} img={context === 'org' ? org.img : this.props.user.img} type={context} name={profileName} />
				<div className="basic">
					{context === 'org'
						? <div><a href={link}>{org.name}</a><br /><br /></div>
						: false
					}
					<span>By <Link to={`/${this.props.user.username}`}>{this.props.user.first} {this.props.user.last} </Link></span>
					&bull;
					<span className="location"> {this.props.location.city}, {this.props.location.state}</span>
					<div className="created">{moment(this.props.post.createdAt).fromNow()}</div>
				</div>
				<Extra post={this.props.post} />
			</div>
		);
	}
});

let Extra = React.createClass({
	contextTypes: {
		route: React.PropTypes.object
	},
	render: function () {
		return false;
		let type = this.props.post.type;

		if (type === 'poll') {
			return <Poll {...this.props} />
		} else if (type === 'event') {
			return (<div className="extra event">
				<i className="fa fa-calendar" />
				{this.props.post.when && moment(this.props.post.when).format() !== 'Invalid date' ? <div className="when">{moment(this.props.post.when).format('MMMM Do @ h:mm a')}</div> : false}
				{this.props.post.location ? <div className="location">{this.props.post.location}</div> : false}
			</div>);
		} else if (this.context.route.type !== 'post' && this.context.route.type !== 'edit') {
			let excerpt = "";
			if (this.props.post && this.props.post.content) {
				excerpt = this.props.post.content.replace(/(<([^>]+)>)/ig, "");
			}
			return <div className="extra excerpt"><div>{excerpt}</div></div>
		} else {
			return false;
		}
	}
});
