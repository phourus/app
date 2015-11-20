"use strict";
let React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      visible: false
    };
  },
  render: function () {
    return (
      <div className="share">
        {this.state.visible
          ? false
          : <div className="toggle" onClick={this._toggle}>
            <i className="fa fa-share" />
            Share
          </div>
        }
        {this.state.visible
          ? <Share toggle={this._toggle} />
          : false
        }
      </div>
    );
  },
  _toggle: function () {
    this.setState({visible: !this.state.visible});
  }
});

let Share = React.createClass({
  render: function () {
    return (
      <ul>
        <li><i className="fa fa-facebook" /> Facebook</li>
        <li><i className="fa fa-twitter" /> Twitter</li>
        <li><i className="fa fa-linkedin" /> LinkedIn</li>
        <li><i className="fa fa-google" /> Google +</li>
        <li><i className="fa fa-slack" /> Slack</li>
        <li><i className="fa fa-envelope" /> Email</li>
        <li onClick={this.props.toggle}><i className="fa fa-close" /> Cancel</li>
      </ul>
    );
  }
});
