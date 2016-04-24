import React from 'react';
import Router from 'react-router';

import Login from '../AuthLogin';
import Signup from '../AuthSignup';
import Forgot from '../AuthForgot';
import Reset from '../AuthReset';

module.exports = React.createClass({
    contextTypes: {
        route: React.PropTypes.object
    },
    getInitialState: function () {
        return {
            login: true,
            signup: false,
            forgot: false,
            reset: false
        };
    },
    componentDidMount: function () {
        this._context();
    },
    componentWillReceiveProps: function () {
        this._context();
    },
    render: function () {
        return (
            <div>
                <Login show={this.state.login} showForgot={this._showForgot} />
                <Signup show={this.state.signup} showLogin={this._showLogin} />
                <Forgot show={this.state.forgot} showLogin={this._showLogin} showReset={this._showReset} />
                <Reset show={this.state.reset} showLogin={this._showLogin} />
            </div>
        );
    },
    _context: function () {
        let query = this.context.route.query;
        if (query && query.reset && query.token) {
            this._showReset();
        }
    },
    _showLogin: function () {
        this.setState({login: true, signup: false, forgot: false, reset: false});
    },
    _showSignup: function () {
        this.setState({login: false, signup: true, forgot: false, reset: false});
    },
    _showForgot: function () {
        this.setState({login: false, signup: false, forgot: true, reset: false});
    },
    _showReset: function () {
        this.setState({login: false, signup: false, forgot: false, reset: true});
    }
});
