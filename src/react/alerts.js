/** @jsx React.DOM */
"use strict";
var React = require('react');
var Store = require('../stores/alerts');
var Actions = require('../actions/alerts');

var Alerts = React.createClass({
    getInitialState: function () {
      return {
        alerts: []
      }
    },
    remove: function (e) {
        var id = e.currentTarget.id;
        Actions.remove(id);
    },
    componentDidMount: function () {
      var self = this;
      Store.listen(function (data) {
        self.setState({alerts: data});
      });
    },
    render: function () {
        var list = [];
        for (var k in this.state.alerts) {
            var alert = this.state.alerts[k];
            list.push(<Alert key={alert.id} id={alert.id} {...alert} remove={this.remove} />);
        }
        return (
            <div className="alerts">
                {list}
            </div>
        );
    }
});

var Alert = React.createClass({
    propTypes: {
      color: React.PropTypes.string,
      msg: React.PropTypes.string,
      code: React.PropTypes.number
    },
    render: function () {
        return (
            <div className={this.props.color + " alert"}>
                <button id={this.props.id} className="remove fa fa-remove" onClick={this.props.remove}></button>
                <div className="msg">{this.props.msg}</div>
                <div className="code">HTTP Status Code: {this.props.code}</div>
            </div>
        );
    }
});

module.exports = Alerts;
