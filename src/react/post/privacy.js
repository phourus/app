"use strict";
let React = require('react');
let Router = require('react-router');
let { Navigation } = Router;

let Actions = require('../../actions/post');
let Store = require('../../stores/post').Collaborators;
let ActionsCollaborators = require('../../actions/post').Collaborators;
let ActionsAccount = require('../../actions/account');
let AccountStore = require('../../stores/account');

let Select = require('react-select');

let Privacy = React.createClass({
	getDefaultProps: function () {
		return {
			post: {}
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
				<strong>Post Privacy</strong>
				<div>
					<button className={classes.private} onClick={this._private}>Private</button>
					<button className={classes.members} onClick={this._members}>{!this.props.post.orgId || this.props.post.orgId === 'null' ? "Phourus Members only" : "Organization Members only" }</button>
					<button className={classes.public} onClick={this._public}>Public</button>
					<Contexts {...this.props} />
					{this.props.post.orgId ? <Collaborators {...this.props} s/> : false}
				</div>
			</div>
		);
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
  mixins: [Navigation],
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
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	render: function () {
    let lookup = this._lookup();
		let list = this.state.list;
		return (
      <div className="collaborators">
				<strong>Collaborators</strong><br />
				<Select
					allowCreate={false}
					onOptionLabelClick={this._click}
					value={this.state.field}
					multi
					placeholder={false}
					options={lookup}
					onChange={this._add} />
      </div>
    );
  },
	_add: function (value) {
		let model = {};
		let item = value.split(':');
		model.postId = this.props.post.id;
		if (item[0] === 'user') {
			model.userId = item[1];
		}
		if (item[0] === 'team') {
			model.teamId = item[1];
		}
		ActionsCollaborators.add(model);
	},
	_remove: function (item, e) {
		if (item.userId) {
			ActionsCollaborators.remove('user', item.userId);
		}
		if (item.teamId) {
			ActionsCollaborators.remove('team', item.teamId);
		}
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
	}
});

module.exports = Privacy;
