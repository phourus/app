/** @jsx React.DOM */
"use strict";
var React = require('react');

var Alerts = React.createClass({
    remove: function (e) {
        var id = e.currentTarget.id;
        var alerts = this.props.alerts;
        alerts.splice(id, 1);
    },
    render: function () {
        var list = [];
        if (this.props.alerts) {
            for (var i in this.props.alerts) {
                list.push(<Alert {...this.props.alerts[i]} id={i} remove={this.remove} />);
            }
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