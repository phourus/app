import React from 'react';
import Router, { History } from 'react-router';
import Select from 'react-select';

import Store from '../../stores/post/collaborators';
import Actions from '../../actions/post/collaborators';

import PostActions from '../../actions/post';

module.exports = React.createClass({
	contextTypes: {
		route: React.PropTypes.object
	},
	getDefaultProps: function () {
		return {
			post: {},
			owner: false
		};
	},
	getInitialState: function () {
		return {
			privacy: true
		};
	},
	render: function () {
		let privacy = this.props.post.privacy || 'private';
		let icons = {
			private: "fa fa-lock",
			members: "fa fa-building",
			public: "fa fa-globe",
			trash: "fa fa-trash"
		};
		let classes = {
			private: "button blue inverted",
			members: "button blue inverted",
			public: "button blue inverted"
		};
		classes[privacy] = "button blue";
		if (this.context.route.type !== 'edit') {
			return <i className={icons[privacy]} />
		}

		return (
			<div className="privacy">
				{this.props.owner && this.context.route.type === 'edit' && this.state.privacy
					? <div>
					<h2>Privacy
						{this.props.owner && this.context.route.type === 'IGNORE'
							? <div className="privacyToggle" onClick={this._privacy}><i className={icons[privacy]} /> <span style={{textDecoration: 'underline'}}>{this.props.post.privacy}</span></div>
						: false}
					</h2>
					<div>
						<Contexts {...this.props} />
						<input type="radio" onClick={this._private} checked={privacy === 'private'} /><label>Private</label><br />
						<input type="radio" onClick={this._public} checked={privacy === 'public'} /><label>Public</label><br />
						<input type="radio" onClick={this._members} checked={privacy === 'members'} /><label>Internal</label>
						{this.props.post.orgId && this.props.post.orgId !== 'null' ? <Collaborators {...this.props} s/> : false}
					</div>
				</div>
				: false}
			</div>
		);
	},
	_privacy: function () {
		this.setState({privacy: !this.state.privacy});
	},
	_private: function (e) {
		PostActions.change('privacy', 'private');
	},
	_members: function (e) {
		PostActions.change('privacy', 'members');
	},
	_public: function (e) {
		PostActions.change('privacy', 'public');
	},
});

let Contexts = React.createClass({
	mixins: [History],
	contextTypes: {
		session: React.PropTypes.object
	},
	render: function () {
		let session = this.context.session;
		let orgs = session.orgs || [];
		return (
			<div className="contexts">
				<select onChange={this._select} value={this.props.post.orgId}>
					<option value="null">Post on my behalf</option>
					{orgs.map((item) => {
						if (item.approved !== true) {
							return false;
						}
						return (
							<option value={item.org.id}>
								{item.org.name}
							</option>
						);
					})}
				</select>
			</div>
		);
	},
	_select: function (e) {
		PostActions.change('orgId', e.currentTarget.value);
	}
});

let Collaborators = React.createClass({
	getDefaultProps: function () {
		return {
			post: {}
		};
	},
	getInitialState: function () {
		return {
			lookup: [],
			list: []
		};
	},
	componentDidMount: function () {
		this.unsubscribe = Store.listen((data) => {
			this.setState(data);
		});
		Actions.collection(this.props.post.id);
		Actions.lookup(this.props.post.orgId);
	},
	componentWillReceiveProps: function (updated) {
		if (updated.post && updated.post.orgId) {
			Actions.lookup(updated.post.orgId);
		}
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	render: function () {
		let lookup = this._lookup();
		let list = this._values();
		return (
			<div className="collaborators">
				<strong>Collaborators</strong><br />
				<Select
					allowCreate={false}
					delimiter={'|'}
					value={list}
					multi
					placeholder={false}
					options={lookup}
					onChange={this._change} />
			</div>
		);
	},
	_change: function (value) {
		let current = this._values().map((data) => {
			return data.value;
		});
		let updated = value.map((data) => {
			return data.value;
		});
		let diff = this._diff(updated, current);
		if (!diff) {
			return;
		}
		if (diff.action === 'add') {
			let model = {postId: this.props.post.id};
			if (diff.type === 'user') {
				model.userId = diff.id;
			} else if (diff.type === 'team') {
				model.teamId = diff.id;
			} else {
				return;
			}
			Actions.add(model);
		}
		if (diff.action === 'remove') {
			Actions.remove(diff.type, diff.id);
		}
	},
	_diff: function (updated, current) {
		let action = 'add';
		let long = updated;
		let short = current;
		let diff;
		let out = [];
		if (updated.length < current.length) {
			action = 'remove';
			long = current;
			short = updated;
		}
		long.forEach((item) => {
			if (short.indexOf(item) === -1 && !diff) {
				diff = item;
			}
		});
		if (diff) {
			let out = diff.split(':');
			return {
				action: action,
				type: out[0],
				id: out[1]
			};
		}
		return false;
	},
	_lookup: function () {
		let out = [];
		let lookup = this.state.lookup;
		if (lookup.members && lookup.members.forEach) {
			lookup.members.forEach((item) => {
				let user = item.user;
				if (user) {
					out.push({value: 'user:' + user.id, label: user.first + ' ' + user.last + ' (' + user.username + ') <' + user.email + '>' });
				}
			});
		}
		if (lookup.teams && lookup.teams.forEach) {
			lookup.teams.forEach((team) => {
				out.push({value: 'team:' + team.id, label: 'Team: ' + team.name});
			});
		}
		return out;
	},
	_values: function () {
		let list = this.state.list;
		if (list && list.map) {
			return list.map((item) => {
				if (item.user) {
					let user = item.user;
					return {value: 'user:' + item.userId, label: user.first + ' ' + user.last};
				}
				if (item.team) {
					return {value: 'team:' + item.teamId, label: 'Team: ' + item.team.name};
				}
				return false;
			});
		}
		return [];
	}
});
