'use strict';
let React = require('react');
let Router = require('react-router');
let { Link } = Router;

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      context: {
        id: 0,
        type: ""
      },
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
        <Link to={this.props.context.type === 'org' ? "orgPosts" : "userPosts"} params={{id: this.props.context.id || 0}}>
          <img src={img} onError={this._default} alt={"Phourus Profile Pic for " + this.props.name} />
        </Link>
      </div>
    );
  },
  _default: function () {
    this.setState({default: true});
  }
});
