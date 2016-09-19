import React from 'react';
import { connect } from 'react-redux'
import ga from '../../lib/analytics';
import util from '../../lib/util';
import { Link } from 'react-router';

import Loader from '../shared/loader';
import Alert from '../shared/alerts';

class Login extends React.Component {

  componentDidMount() {
    // this.unsubscribe = Store.listen(data => {
    //   if (data.code === 200 && this.state.clicked === true) {
    //     data.clicked = false;
    //     let url = util.createHomeURL();
    //     let route = this.props.route;
    //     if (!route.subdomain) {
    //       url = url + '/stream';
    //     }
    //     window.location = url;
    //   }
    //   if (!data.alert) {
    //     data.alert = null;
    //   }
    //   data.ready = true;
    //   this.setState(data);
    // });
  }

  render() {
    let session = this.props.session;
    let user = session.user;
    if (!this.props.show) {
      return false;
    }
    if (!this.props.ready) {
      return <Loader />
    }
    if (session.authenticated) {
      let name = user.first;
      return (
        <div className="login">
          <span className="welcome">Welcome back{name ? " " + name : ""}! <Link to="/stream">Click here to view posts</Link></span><br />
          <button className="button blue" onClick={this._posts}>View posts</button>
          <button className="button blue" onClick={this._account}>View my account</button>
        </div>
      );
    }
    return (
      <div className="login">
        {this.state.alert
          ? <Alert {...this.state.alert} />
          : false
        }
        <label>
          Email:
          <input ref="username" className="username" placeholder="your email address"/>
        </label>
        <label>
          Password:
          <input ref="password" className="password" type="password" placeholder="your password" />
        </label>
        {this.state.code === 401 && this.state.loaded && this.state.action === 'login'
          ? <div className="message red" onClick={this._clear}>There was an error logging in. Please try again or <a href="mailto:info@phourus.com&subject=Error">contact us.</a></div>
          : false
        }
        <button onClick={this._login} className="green button">Login</button>
        <a href="javascript:void(0)" className="forgotLink" onClick={this.props.showForgot}>Forgot your login information? Click here</a>
      </div>
    );
  }

  _login() {
    let username = this.refs.username.getDOMNode().value;
    let password = this.refs.password.getDOMNode().value;
    this._clear();
    this.setState({clicked: true, ready: false});
    this.props.actions.login(username, password);
    ga('send', 'event', 'account', 'login');
  }

  _request() {
    //this._clear();
    this.props.history.push("/request");
  }

  _clear() {
    this.setState({code: null});
  }

  _posts() {
    this.props.history.push("/stream");
  }

  _account() {
    this.props.history.push("/account");
  }
}

const mapState = (state) => {
  return {
    session: {}
  }
}

export default connect(mapState)(Login)
