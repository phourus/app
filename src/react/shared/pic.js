'use strict';
let React = require('react');
let Router = require('react-router');
let { Link } = Router;

module.exports = React.createClass({
  contextTypes: {
    route: React.PropTypes.route
  },
  getDefaultProps: function () {
    return {
      id: 0,
      name: "",
      type: ""
    };
  },
  getInitialState: function () {
    return {
      default: false
    };
  },
  render: function () {
    let img = this.props.img;
    let link = this.context.route.createOrgLink(this.props.id);
    if (this.state.default) {
      img = '/assets/avatars/default.jpg';
    }
    return (
      <div className="pic">
        {this.props.type === 'org'
          ? <a href={link}>
            <img src={img} onError={this._default} alt={"Phourus Profile Pic for " + this.props.name} />
          </a>
          : <Link to={`/${this.props.id}`}>
            <img src={img} onError={this._default} alt={"Phourus Profile Pic for " + this.props.name} />
          </Link>
        }
      </div>
    );
  },
  _default: function () {
    this.setState({default: true});
  }
});
