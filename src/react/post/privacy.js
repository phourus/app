"use strict";
let React = require('react');
let Router = require('react-router');
let { Navigation } = Router;

let Actions = require('../../actions/post');

let Privacy = React.createClass({
	render: function () {
		return (
			<div>
				<h2>Post Privacy</h2>
				<strong>Post on behalf of</strong>
				<Privacy.Orgs {...this.props} />
				<strong>Visibility</strong>
				<select ref="privacy" value={this.props.post.privacy} onChange={this._privacy}>
					<option value="private">Private</option>
					<option value="members">{!this.props.post.orgId || this.props.post.orgId === 'null' ? "Phourus Members only" : "Organization Members only" }</option>
					<option value="public">Public</option>
				</select>
			</div>
		);
	},
	_privacy: function (e) {
		Actions.change('privacy', e.currentTarget.value);
	}
});

Privacy.Orgs = React.createClass({
  mixins: [Navigation],
  getInitialState: function () {
    return {
      orgs: []
    }
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
      <div className="orgs">
				<div className="org">
					Me
					<button id="null" onClick={this._select} className="button blue" disabled={!this.props.post.orgId || this.props.post.orgId === 'null'}>Post on my behalf</button>
				</div>
        {this.state.orgs.map((item) => {
					if (item.approved !== true) {
						return false;
					}
					return (
            <div className="org">
							{item.org.name}
              <button id={item.org.id} onClick={this._select} className="button blue" disabled={parseInt(this.props.post.orgId) === item.org.id}>Select Organization</button>
            </div>
          );
        })}
      </div>
    );
  },
  _select: function (e) {
		Actions.change('orgId', e.currentTarget.id);
  }
});

module.exports = Privacy;
