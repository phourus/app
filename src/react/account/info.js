"use strict";
let React = require('react');
let ga = require('../../analytics');

let Store = require('../../stores/users');
let Actions = require('../../actions/profile').User;

let TutorialActions = require('../../actions/tutorial');

module.exports = React.createClass({
  contextTypes: {
    session: React.PropTypes.object
  },
  getInitialState: function () {
    return {
      user: {},
      changes: {}
    };
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen((data) => {
      if (data.user) {
        this.setState({user: data.user});
      }
      if (data.changes) {
        this.setState({changes: data.changes});
      }
    });
    TutorialActions.ready(true);
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    let session = this.context.session;
    let account = session.user;
    Object.keys(this.state.changes).forEach((key) => {
      account[key] = this.state.changes[key];
    });
    return (
      <div className="info">
        <h3>Basic Information</h3>
        <div id="user_basic">
          <label>Username
            <input className="username" type="text" value={account.username} disabled="true" />
          </label>
          <label>Email
            <input className="email" type="text" value={account.email} onChange={this._email} />
          </label>
          <label>First
            <input className="first" type="text" value={account.first} onChange={this._first} />
          </label>
          <label>Last
          <input className="last" type="text" value={account.last} onChange={this._last} />
          </label>
          <label>Phone
            <input className="phone" type="text" value={account.phone} onChange={this._phone} />
          </label>
          <label>Company
            <input className="company" type="text" value={account.company} onChange={this._company} />
          </label>
          <label>Occupation
            <input className="occupation" type="text" value={account.occupation} onChange={this._occupation} />
          </label>
          <label>Website
            <input className="website" type="text" value={account.website} onChange={this._website} />
          </label>
          <label>Date of Birth
            <input className="dob" type="datetime" value={account.dob} onChange={this._dob} />
          </label>
          <label>Gender
            <select className="gender" value={account.gender} onChange={this._gender}>
              <option value="">Private</option>
              <option value="F">Female</option>
              <option value="M">Male</option>
            </select>
          </label>
        </div>
        <button className="button green" onClick={this._save}>Save Changes</button>
      </div>
    );
  },
  _first: function (e) { Actions.change('first', e.currentTarget.value); },
  _last: function (e) { Actions.change('last', e.currentTarget.value); },
  _phone: function (e) { Actions.change('phone', e.currentTarget.value); },
  _company: function (e) { Actions.change('company', e.currentTarget.value); },
  _occupation: function (e) { Actions.change('occupation', e.currentTarget.value); },
  _website: function (e) { Actions.change('website', e.currentTarget.value); },
  _dob: function (e) { Actions.change('dob', e.currentTarget.value); },
  _gender: function (e) { Actions.change('gender', e.currentTarget.value); },
  _save: function () {
    Actions.save();
    ga('send', 'event', 'account', 'edit');
  }
});
