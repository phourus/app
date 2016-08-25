"use strict";
let React = require('react');
let Router = require('react-router');
let { Link } = Router;

let Notifications = require('./notifications');
let History = require('./history');

module.exports = React.createClass({
  contextTypes: {
    session: React.PropTypes.object
  },
  getInitialState: function () {
    return {
      selected: "notifications"
    }
  },
  componentDidMount: function () {
    this._route();
  },
  componentWillReceiveProps: function () {
    this._route();
  },
  render: function () {
    let session = this.context.session;
    if (!session.authenticated) {
      return (<div className="activity 401">
				<h2>You need to login first to view activity</h2>
				<p>Please login if you'd like to see your account activity.</p>
			</div>);
    }
    return (
      <div className="activity">
        <div className="toggle">
          <h3><Link to="/notifications">Notifications</Link> | <Link to="/history">History</Link></h3>
        </div>
        <Notifications selected={this.state.selected} />
        <History selected={this.state.selected} />
      </div>
    );
  },
  _route: function () {
    let route = this.props.routes;
    if (route[1].name === 'history') {
      this.setState({selected: 'history'});
    } else {
      this.setState({selected: 'notifications'});
    }
  }
});
