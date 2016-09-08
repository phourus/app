import React from 'react';
import ga from '../../lib/analytics';

export default React.createClass({
  getDefaultProps: function () {
    return {
      show: false
    };
  },
  getInitialState: function () {
    return {}
  },
  componentDidMount: function () {
    // this.unsubscribe = Store.listen(data => {
    //   this.setState(data);
    // });
  },
  render: function () {
    if (!this.props.show) {
      return false;
    }
    return (
      <div className="forgot">
        <label>
          Email:
          <input placeholder={"your email login"} onChange={this._email} />
        </label>
        <button onClick={this._forgot} className="blue button submit">Email me a reset link</button>
        <a href="javascript: void(0)" onClick={this.props.showLogin}>Cancel</a>
        {this.state.code === 500 && this.state.action === 'forgot'
          ? <div className="message red" onClick={this._clear}>There was an error sending your reset link. Please try again or <a href="mailto:info@phourus.com&subject=Error">contact us.</a></div>
          : false
        }
        {this.state.code === 200 && this.state.action === 'forgot'
          ? <div className="message green" onClick={this._clear}>Instructions to reset your password have been sent to your email address.</div>
          : false
        }
      </div>
    );
  },
  _email: function (e) { this.setState({email: e.currentTarget.value }); this._clear(); },
  _forgot: function () {
    this.props.actions.forgot(this.state.email)
    this.setState({email: "", code: null});
    ga('send', 'event', 'account', 'forgot');
  },
  _clear: function () {
    this.setState({code: null});
  }
});
