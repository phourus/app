import React from 'react';

import ga from '../../lib/analytics';
import util from '../../lib/util';
import { Link } from 'react-router';

import Loader from '../shared/loader';
import Alert from '../shared/alerts';

export default class Login extends React.Component {

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
    const { alert, session, show } = this.props
    const { user } = session

    if (!show) {
      return false
    }
    if (!session.ready) {
      return <Loader />
    }
    if (session.authenticated) {
      const name = user.first

      return (
        <div className="login">
          <span className="welcome">Welcome back{name ? " " + name : ""}! <Link to="/stream">Click here to view posts</Link></span><br />
          <button className="button blue" onClick={this._posts.bind(this)}>View posts</button>
          <button className="button blue" onClick={this._account.bind(this)}>View my account</button>
        </div>
      )
    }

    // {code === 401 && loaded && this.state.action === 'login'
    //   ? <div className="message red" onClick={this._clear}>There was an error logging in. Please try again or <a href="mailto:info@phourus.com&subject=Error">contact us.</a></div>
    //   : false
    // }

    return (
      <div className="login">
        {alert
          ? <Alert {...alert} />
          : false
        }
        <label>
          Email:
          <input ref="username" className="username" placeholder="your email address" />
        </label>
        <label>
          Password:
          <input ref="password" className="password" type="password" placeholder="your password" />
        </label>
        <button onClick={this._login.bind(this)} className="green button">Login</button>
        <a href="javascript:void(0)" className="forgotLink" onClick={this.props.showForgot.bind(this)}>Forgot your login information? Click here</a>
      </div>
    );
  }

  _login() {
    const username = this.refs.username.value
    const password = this.refs.password.value
    // this._clear()
    this.props.actions.login(username, password)
    ga('send', 'event', 'account', 'login')
  }

  _request() {
    //this._clear();
    this.props.history.push("/request");
  }

  _clear() {
    //this.setState({code: null});
  }

  _posts() {
    this.props.history.push("/stream");
  }

  _account() {
    this.props.history.push("/account");
  }
}
