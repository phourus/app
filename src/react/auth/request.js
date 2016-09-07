import React from 'react';
import { Link } from 'react-router';

import Actions from '../../actions/auth';
import Store from '../../stores/auth';

export default React.createClass({
  getInitialState: function () {
    return {
      email: ""
    };
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen(data => {
      this.setState(data);
    });
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    return (
      <div className="request">
        <h1>Request Access</h1>
        <p>Phourus is currently in Private Beta, so please provide your email below if you'd like to join.</p>
        <label>
          Email:
          <input className="username" placeholder="your email address" onChange={this._email} />
        </label>
        {this.state.code === 500
          ? <div className="message red" onClick={this._clear}>There was an error requesting access. Please try again or <a href="mailto:info@phourus.com&subject=Error">contact us.</a></div>
          : false
        }
        {this.state.code === 409
          ? <div className="message red" onClick={this._clear}>That email already exists. Use a different email address or <a>login with your existing email.</a></div>
          : false
        }
        {this.state.code === 202
          ? <div className="message green" onClick={this._clear}>Your request has been received. We will email you with further instructions if you are accepted.</div>
          : false
        }
        <button onClick={this._request} className="green button">Request Access</button>
      </div>
    );
  },
  _email: function (e) { this.setState({email: e.currentTarget.value }); },
  _request: function () {
    Actions.request(this.state.email);
  },
  _clear: function () {
    this.setState({code: null});
  }
});
