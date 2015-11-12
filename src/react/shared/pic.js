'use strict';
let React = require('react');
let Router = require('react-router');
let { Link } = Router;

module.exports = React.createClass({
  getInitialState: function () {
    return {
			id: 0,
      img: '/assets/avatars/default.jpg',
      default: '/assets/avatars/default.jpg',
      name: ""
    }
  },
  componentDidMount: function () {
    this.setState(this.props);
  },
  componentWillReceiveProps: function (data) {
    if (data.img) {
      this.setState(data);
    }
  },
  render: function () {
    return (
      <div className="pic">
        <Link to={this.props.context === 'org' ? "orgPosts" : "userPosts"} params={{id: this.state.id}}>
          <img src={this.state.img} onError={this._default} alt={"Phourus Profile Pic for " + this.state.name} />
        </Link>
      </div>
    );
  },
  _default: function () {
    this.setState({img: this.state.default});
  }
});
