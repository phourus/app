"use strict";
let React = require('react');
let Store = require('../stores/alerts');
let Actions = require('../actions/alerts');

let Alerts = React.createClass({
    getInitialState: function () {
      return {
        alerts: []
      }
    },
    remove: function (e) {
      let id = e.currentTarget.id;
        Actions.remove(id);
    },
    componentDidMount: function () {
      let self = this;
      Store.listen(function (data) {
        self.setState({alerts: data});
      });
    },
    render: function () {
      let list = [];
        for (let k in this.state.alerts) {
          let alert = this.state.alerts[k];
            list.push(<Alert key={alert.id} id={alert.id} {...alert} remove={this.remove} />);
        }
        return (
            <div className="alerts">
                {list}
            </div>
        );
    }
});

let Alert = React.createClass({
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
