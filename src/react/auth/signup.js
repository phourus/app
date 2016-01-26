"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, History } = Router;
let Actions = require('../../actions/account');
let Store = require('../../stores/account');
let ga = require('../../analytics');

module.exports = React.createClass({
  mixins: [History],
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
      confirm: "",
      organization: "",
      loaded: false,
      user: {},
      org: {}
    };
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen(data => {
      if (data.user && data.user.id) {
        this.setState({user: data.user, step: 1});
      }
      if (data.org) {
        this.setState({org: data.org, step: 2});
      }
    });
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  componentDidUpdate: function () {
    if (this.state.loaded === false) {
      this.setState({code: null, loaded: true});
    }
  },
  render: function () {
    if (!this.props.show) {
      return false;
    }
    let steps = ["", "", ""];
    for (var i = 0; i < this.state.step + 1; i++) {
      steps[i] = "complete";
    }
    //steps[this.state.step] = "selected";
    return (
      <div className="signup">
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
        <div className="squeeze">
          <div className="instructions">
            <p className={steps[0]}>To start using Phourus, you will want to create a personal account. Once you have a personal account, you can create or join existing organization accounts.</p>
            <p className={steps[1]}>Although Phourus can be used strictly as an individual, the real benefit comes from using it within an organization. If your organization already has a Phourus account, or you'd like to create one, simply type your organization name into the organization field in the signup form.</p>
            <p className={steps[2]}>Your account has been created, welcome to Phourus! You will receive an email confirmation, and can <a>edit your account here</a>.</p>
          </div>
          {this.state.step === 0
            ? <div className="form">
              <label>
                Your Email:
                <input ref="email" className="email" placeholder="enter your email address" value={this.state.email} onChange={this._email} />
              </label>
              <label>
                Password:
                <input ref="password" className="password" type="password" placeholder="enter a password" value={this.state.password} onChange={this._password} />
              </label>
              <label>
                Confirm Password:
                <input ref="confirm" className="confirm" type="password" placeholder="confirm your password" value={this.state.confirm} onChange={this._confirm} />
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
                Organization Name:
                <input className="confirm" placeholder="organization name" disabled value={this.state.organization} onChange={this._organization} />
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
  _organization: function (e) {
    var value = e.currentTarget.value;
    this.setState({organization: value});
  },
  _signup: function () {
    if (this.state.password === this.state.confirm) {
      Actions.register(this.state.email, this.state.password);
      ga('send', 'event', 'account', 'signup');
    }
  },
  _organizations: function (e) {
    if (this.state.user && this.state.user.id) {
      Actions.createOrganization(this.state.organization);
    }
  },
  _join: function (orgId) {
    Actions.joinOrganization(orgId);
  },
  _skip: function () {
    this.setState({step: 2});
  },
  _account: function (e) {
    this.history.pushState(null, "/account");
  },
  _clear: function () {
    this.setState({code: null});
  }
});
