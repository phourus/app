'use strict';
let React = require('react');
let Router = require('react-router');
let { Link } = Router;

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      name: ""
    };
  },
  getInitialState: function () {
    return {
      default: false
    };
  },
  render: function () {
    let img = this.props.img;
    if (this.state.default) {
      img = '/assets/avatars/default.jpg';
    }
    return (
      <div className="pic">
        <Link to={this.props._route.type === 'org' ? "orgPosts" : "userPosts"} params={{id: this.props._route.id || 0}}>
          <img src={img} onError={this._default} alt={"Phourus Profile Pic for " + this.props.name} />
        </Link>
      </div>
    );
  },
  _default: function () {
    this.setState({default: true});
  }
});
