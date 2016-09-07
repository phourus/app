import React from 'react';
import ga from '../../lib/analytics';
import util from '../../lib/util';
import { Link } from 'react-router';

import Actions from '../../actions/session';
import Store from '../../stores/session';
import {Orgs as ProfileActions} from '../../actions/profile';
import ProfileStore from '../../stores/orgs';
import MemberActions from '../../actions/members';
import Alert from '../shared/alerts';

let emailReg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
let usernameReg = /^([a-z]|[A-Z]|[0-9]|-){2,20}$/;
let passwordReg = /^(.){6,20}$/;

export default React.createClass({
  contextTypes: {
    route: React.PropTypes.object
  },
  getDefaultProps: function () {
    return {
      show: false
    };
  },
  getInitialState: function () {
    return {
      step: 0,
      email: "",
      password: "",
      username: "",
      confirm: "",
      organization: "",
      loaded: false,
      user: {},
      org: {},
      invalid: {}
    };
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen(data => {
      if (data.action === 'login' && data.code === 200) {
        let url = util.createHomeURL();
        let route = this.context.route;
        if (!route.subdomain) {
          url = url + '/stream';
        }
        window.location = url;
      }
    });
    this.unsubscribeProfile = ProfileStore.listen(data => {
      if (data.org) {
        this.setState({org: data.org, step: 2});
      }
    });
  },
  componentWillUnmount: function () {
    this.unsubscribe();
    this.unsubscribeProfile();
  },
  componentDidUpdate: function () {
    if (this.state.loaded === false) {
      this.setState({code: null, loaded: true});
    }
  },
  render: function () {
    let steps = ["", "", ""];
    for (var i = 0; i < this.props.step + 1; i++) {
      steps[i] = "complete";
    }
    //steps[this.state.step] = "selected";
    if (!this.props.show) {
      return false;
    }
    return (
      <div className="signup">
        <div className="squeeze">
          <div className="instructions">
            <p className={steps[0]}>To start using Phourus, you will want to create a personal account. Once you have a personal account, you can create or join existing organization accounts.</p>
            <p className={steps[1]}>Although Phourus can be used strictly as an individual, the real benefit comes from using it within an organization. If your organization already has a Phourus account, or you'd like to create one, simply type your organization name into the organization field in the signup form.</p>
            <p className={steps[2]}>Your account has been created, welcome to Phourus! You will receive an email confirmation, and can <a>edit your account here</a>.</p>
          </div>
          {this.state.step === 0
            ? <div className="form">
              <label>
                {this.state.invalid.email ? <Alert msg={this.state.invalid.email} color='red' /> : false }
                Your Email:
                <input ref="email" className="email" placeholder="enter your email address" value={this.state.email} onChange={this._email} />
              </label>
              <label>
                {this.state.invalid.password ? <Alert msg={this.state.invalid.password} color='red' /> : false }
                Password:
                <input ref="password" className="password" type="password" placeholder="enter a password" value={this.state.password} onChange={this._password} />
              </label>
              <label>
                {this.state.invalid.confirm ? <Alert msg={this.state.invalid.confirm} color='red' /> : false }
                Confirm Password:
                <input ref="confirm" className="confirm" type="password" placeholder="confirm your password" value={this.state.confirm} onChange={this._confirm} />
              </label>
              <label>
                {this.state.invalid.username ? <Alert msg={this.state.invalid.username} color='red' /> : false }
                Username:
                <div>
                  <span>phourus.com/</span>
                  <input ref="username" className="username" placeholder="username" value={this.state.username} onChange={this._username} />
                </div>
              </label>
              {this.state.code && this.state.loaded
                ? <div className="error" onClick={this._clear}>There was an error creating your account. Please try again or <a href="mailto:info@phourus.com&subject=Error">contact us.</a></div>
                : false
              }
            </div>
            : false
          }
          {this.state.step === 1
            ? <div className="form">
              <label>
                Organization Name (optional):
                <input className="organization" placeholder="organization name" value={this.state.organization} onChange={this._organization} />
              </label>
              <label>
                Organization homepage:
                <div>
                  <input className="shortname" placeholder="subdomain" disabled value={this.state.shortname} onChange={this._shortname} />
                  <span>.phourus.com</span>
                </div>
              </label>
              {this.state.code && this.state.loaded
                ? <div className="error" onClick={this._clear}>There was an error creating your account. Please try again or <a href="mailto:info@phourus.com&subject=Error">contact us.</a></div>
                : false
              }
            </div>
            : false
          }
          {this.state.step === 2
            ? <div className="form">
              <label>
                Your Email Login:
                <input ref="email" className="email" placeholder="enter your email address" disabled value={this.state.email} onChange={this._email} />
              </label>
              <label>
                Username:
                <input value={this.state.username} disabled />
              </label>
              <label>
                Password:
                <input value={"XXXXXXXXXXX"} disabled />
              </label>
              {this.state.code && this.state.loaded
                ? <div className="error" onClick={this._clear}>There was an error creating your account. Please try again or <a href="mailto:info@phourus.com&subject=Error">contact us.</a></div>
                : false
              }
            </div>
            : false
          }
          {this.state.step === 0
            ? <div className="next">
                <button onClick={this._signup}>Next <i className="fa fa-chevron-right" /></button>
              </div>
            : false
          }
          {this.state.step === 1
            ? <div className="next">
                <button onClick={this._organizations}>Next <i className="fa fa-chevron-right" /></button><br />
                <button onClick={this._skip}>Skip <i className="fa fa-chevron-right" /></button>
              </div>
            : false
          }
          {this.state.step === 2
            ? <div className="next">
                <button onClick={this._account}>Finish <i className="fa fa-chevron-right" /></button>
              </div>
            : false
          }
        </div>
      </div>
    );
  },
  _email: function (e) {
    var value = e.currentTarget.value;
    this.setState({email: value});
  },
  _password: function (e) {
    var value = e.currentTarget.value;
    this.setState({password: value});
  },
  _confirm: function (e) {
    var value = e.currentTarget.value;
    this.setState({confirm: value});
  },
  _username: function (e) {
    var value = e.currentTarget.value;
    this.setState({username: value});
  },
  _organization: function (e) {
    var value = e.currentTarget.value;
    this.setState({organization: value});
  },
  _signup: function () {
    let invalid = this._validate();
    if (!Object.keys(invalid).length) {
      Actions.register(this.state.email, this.state.password, this.state.username);
      ga('send', 'event', 'account', 'signup');
    }
    this.setState({invalid: invalid});
  },
  _organizations: function (e) {
    if (this.state.user && this.state.user.id) {
      ProfileActions.create(this.state.organization);
    }
  },
  _join: function (orgId) {
    MemberActions.request(orgId);
  },
  _skip: function () {
    this.setState({step: 2});
  },
  _account: function (e) {
    this.history.pushState(null, "/account");
  },
  _clear: function () {
    this.setState({code: null});
  },
  _validate: function () {
    let invalid = {};
    if (!this.state.email.match(emailReg)) {
      invalid.email = "Email is invalid";
    }
    if (!this.state.password.match(passwordReg)) {
      invalid.password = 'Password is invalid';
    }
    if (!this.state.username.match(usernameReg)) {
      invalid.username = 'Username is invalid';
    }
    if (this.state.confirm !== this.state.password) {
      invalid.confirm = 'Passwords do not match';
    }
    return invalid;
  }
});

let Progress = React.createClass({
  getDefaultProps: function () {
    return {
      step: 0
    };
  },
  render: function () {
    return (
      <div>
        <div className="steps">
          <ul>
            <li>
              <div className="label">Account Info</div>
            </li>
            <li>
              <div className="label">Organizations</div>
            </li>
            <li>
              <div className="label">Account Access</div>
            </li>
          </ul>
        </div>
        <div className="progress">
          <ul>
            <li className={steps[0]}>
              <div className="step"></div>
            </li>
            <li className="line"></li>
            <li className={steps[1]}>
              <div className="step"></div>
            </li>
            <li className="line"></li>
            <li className={steps[2]}>
              <div className="step"></div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});
