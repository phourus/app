"use strict";
let React = require('react');

let Store = require('../stores/account');
let Actions = require('../actions/account');

let Info = require('./account/info');
let Orgs = require('./account/organizations');

let Account = React.createClass({
  getInitialState: function () {
    return {
      user: {},
      changes: {},
      address: {}
    }
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen((data) => {
      this.setState(data);
    });
    Actions.get();
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    return (
      <div className="account">
        <h2>My Account</h2>
        <Info {...this.state} change={this._change} />
        <Orgs />
      </div>
    );
  },
  _change: function (e) {
    let user = this.state.user;
    user[e.target.className] = e.target.value;
    this.setState({user: user});
  }
});

module.exports = Account;
