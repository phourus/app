"use strict";
let React = require('react');
let Router = require('react-router');
let { Navigation } = Router;

let Actions = require('../../actions/post');
let ActionsAccount = require('../../actions/account');
let AccountStore = require('../../stores/account');

let Privacy = React.createClass({
	getDefaultProps: function () {
		return {
			post: {}
		};
	},
	render: function () {
		let privacy = this.props.post.privacy || 'private';
		let classes = {
			private: "button blue",
			members: "button blue",
			public: "button blue"
		};
		classes[privacy] += " inverted";
		return (
			<div className="privacy">
				<strong>Post Privacy</strong>
				<div>
					<button className={classes.private} onClick={this._private}>Private</button>
					<button className={classes.members} onClick={this._members}>{!this.props.post.orgId || this.props.post.orgId === 'null' ? "Phourus Members only" : "Organization Members only" }</button>
					<button className={classes.public} onClick={this._public}>Public</button>
					<Contexts {...this.props} />
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

module.exports = Privacy;
