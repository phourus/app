"use strict";
let React = require('react');
let Router = require('react-router');
let { Navigation } = Router;

let Actions = require('../../actions/post');
let ActionsCollaborators = require('../../actions/post').Collaborators;
let ActionsAccount = require('../../actions/account');
let AccountStore = require('../../stores/account');
let PostStore = require('../../stores/post');

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
			lookup: "",
			collaborators: []
		};
	},
	componentDidMount: function () {
		this.unsubscribe = PostStore.listen((data) => {
			this.setState(data);
		});
		ActionsCollaborators.collection(this.props.post.id);
		ActionsCollaborators.lookup(this.props.post.orgId);
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	render: function () {
    let lookup = this.state.lookup;
		let collaborators = this.state.collaborators;
		return (
      <div className="collaborators">
				<strong>Collaborators</strong><br />
        {collaborators.map((item, index) => {
          return (
            <span className="collaborator" key={index}>
							<a href="">{item.name}</a>
							<a href="javascript:void(0)" id={item.userId || item.teamId} className="remove" onClick={this._remove.bind(this, item)}>x</a>
						</span>
          );
        })}
				<div className="collaboratorField">
					<input placeholder="add collaborators here" onChange={this._change} type="text" value={this.state.field} />
					<button ref="add" onClick={this._add}>Add Collaborator</button>
				</div>
      </div>
    );
  },
	_change: function (e) {
		this.setState({field: e.currentTarget.value});
	},
	_add: function () {
		let model = {};
		let item = this.state.field.split(':');
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
	}
});

module.exports = Privacy;
