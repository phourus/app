"use strict";
let React = require('react');
let Router = require('react-router');
let { History } = Router;

let Actions = require('../../actions/post');
let Store = require('../../stores/post/collaborators');
let ActionsCollaborators = require('../../actions/post/collaborators');
let ActionsAccount = require('../../actions/account');
let AccountStore = require('../../stores/account');

let Select = require('react-select');

let Privacy = React.createClass({
	getDefaultProps: function () {
		return {
			context: {},
			post: {},
			owner: false
		};
	},
	getInitialState: function () {
		return {
			privacy: false
		};
	},
	render: function () {
		let privacy = this.props.post.privacy || 'private';
		let classes = {
			private: "button blue inverted",
			members: "button blue inverted",
			public: "button blue inverted"
		};
		classes[privacy] = "button blue";
		return (
			<div className="privacy">
				{this.props.owner && this.props.context.type === 'edit'
					? <div className="privacyToggle" onClick={this._privacy}><i className="fa fa-lock" /> <span style={{textDecoration: 'underline'}}>Privacy: {this.props.post.privacy}</span></div>
					: false
				}
				{this.state.privacy
					? <div>
							<strong>Post Privacy</strong>
							<div>
								<button className={classes.private} onClick={this._private}>Private</button>
								<button className={classes.members} onClick={this._members}>{!this.props.post.orgId || this.props.post.orgId === 'null' ? "Phourus Members only" : "Organization Members only" }</button>
								<button className={classes.public} onClick={this._public}>Public</button>
								<Contexts {...this.props} />
								{this.props.post.orgId && this.props.post.orgId !== 'null' ? <Collaborators {...this.props} s/> : false}
							</div>
						</div>
					: false
				}
			</div>
		);
	},
	_privacy: function () {
		this.setState({privacy: !this.state.privacy});
	},
	_private: function (e) {
		Actions.change('privacy', 'private');
	},
	_members: function (e) {
		Actions.change('privacy', 'members');
	},
	_public: function (e) {
		Actions.change('privacy', 'public');
	},
});

let Contexts = React.createClass({
  mixins: [History],
  getInitialState: function () {
    return {
      orgs: []
    };
  },
  componentDidMount: function () {
    this.unsubscribe = AccountStore.listen((data) => {
      if (data.orgs) {
        this.setState({orgs: data.orgs});
      }
    });
    ActionsAccount.orgs();
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    return (
      <div className="contexts">
				<select onChange={this._select} value={this.props.post.orgId}>
					<option value="null">Post on my behalf</option>
					{this.state.orgs.map((item) => {
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
		Actions.change('orgId', e.currentTarget.value);
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
		ActionsCollaborators.collection(this.props.post.id);
		ActionsCollaborators.lookup(this.props.post.orgId);
	},
	componentWillReceiveProps: function (updated) {
		if (updated.post && updated.post.orgId) {
			ActionsCollaborators.lookup(updated.post.orgId);
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
		let updated = value.split('|');
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
			ActionsCollaborators.add(model);
		}
		if (diff.action === 'remove') {
			ActionsCollaborators.remove(diff.type, diff.id);
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

module.exports = Privacy;
