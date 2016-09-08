import React from 'react';
import { connect } from 'react-redux'
import Router from 'react-router';
import Login from '../../auth/login';
import Signup from '../../auth/signup';
import Forgot from '../../auth/forgot';
import Reset from '../../auth/reset';

class Auth extends React.Component {

  componentDidMount() {
    this._context()
  }

  componentWillReceiveProps() {
    this._context()
  }

  render() {
    return (
      <div className="auth">
        <Login show={this.props.login} showForgot={this._showForgot.bind(this)} />
        <Signup show={this.props.signup} showLogin={this._showLogin.bind(this)} />
        <Forgot show={this.props.forgot} showLogin={this._showLogin.bind(this)} showReset={this._showReset.bind(this)} />
        <Reset show={this.props.reset} showLogin={this._showLogin.bind(this)} />
      </div>
    )
  }

  _context() {
    let query = this.props.route.query;
    if (query && query.reset && query.token) {
      this._showReset();
    }
  }

  _showLogin() {
    //this.setState({login: true, signup: false, forgot: false, reset: false});
  }

  _showSignup() {
    //this.setState({login: false, signup: true, forgot: false, reset: false});
  }

  _showForgot() {
    //this.setState({login: false, signup: false, forgot: true, reset: false});
  }

  _showReset() {
    //this.setState({login: false, signup: false, forgot: false, reset: true});
  }
}

const mapState = (state) => {
  return {
    route: {}
  }
}

export default connect(mapState)(Auth)
