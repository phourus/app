"use strict";
let React = require('react');
let Router = require('react-router');
let { Link } = Router;
let moment = require('moment');

let Pic = require('../shared/pic');
let Poll = require('./poll');

module.exports = React.createClass({
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
		let context = 'user';
		let profileName = "Phourus User";
		let org = {};
		let excerpt = "";
		if (this.props.post && this.props.post.content) {
			excerpt = this.props.post.content.replace(/(<([^>]+)>)/ig, "");
		}
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
			context = 'org';
		}
		return (
			<div className="details">
				<Pic id={context === 'org' ? org.id : this.props.user.id} img={context === 'org' ? org.img : this.props.user.img} type={context} name={profileName} />
				<div className="basic">
					{context === 'org'
						? <div><Link to={`stream/org/${org.id}`}>{org.name}</Link><br /><br /></div>
						: false
					}
					<span>By <Link to={`stream/user/${this.props.user.id}`}>{this.props.user.first} {this.props.user.last} </Link></span>
					&bull;
					<span className="location"> {this.props.location.city}, {this.props.location.state}</span>
					<div className="created">{moment(this.props.post.createdAt).fromNow()}</div>
				</div>
				{this.props.post.type === 'poll'
					? <Poll {...this.props} />
					: false
				}
				{this.props.post.type === 'event'
					?
					<div className="extra event">
						<i className="fa fa-calendar" />
						{this.props.post.when && moment(this.props.post.when).format() !== 'Invalid date' ? <div className="when">{moment(this.props.post.when).format('MMMM Do @ h:mm a')}</div> : false}
						{this.props.post.location ? <div className="location">{this.props.post.location}</div> : false}
					</div>
					: false
				}
				{this.props.post.type !== 'event' && this.props.post.type !== 'poll' && this.props._route.type !== 'post' && this.props._route.type !== 'edit'
					? <div className="extra excerpt"><div>{excerpt}</div></div>
					: false
				}
			</div>
		);
	}
});
