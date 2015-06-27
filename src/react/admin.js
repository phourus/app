let React = require('react');
let Router = require('react-router');
let { RouteHandler, Link } = Router;

let Admin = React.createClass({
  getInitialState: function () {
    return {
      id: 1,
      img: 1,
      name: "ABC Company",
      address: {
        city: "Santa Monica",
        state: "CA"
      }
    }
  },
  render: function () {
    return (
      <div>
        <Heading {...this.state} />
        <Tabs />
        <RouteHandler />
      </div>
    );
  }
});

let Heading = React.createClass({
  render: function () {
    return (
      <div className="heading">
        <Pic {...this.props} />
        <Basic {...this.props} />
      </div>
    );
  }
});

let Pic = React.createClass({
  render: function () {
    //<Link href="/account/password">Change my password</Link>
    return (
      <div className="pic">
        <Link to="user" params={{id: this.props.id}}>
          <img src={`/assets/avatars/${this.props.img}.jpg`} />
        </Link>
      </div>
    );
  }
});

let Basic = React.createClass({
  render: function () {
    return (
      <div className="basic">
        <div>{this.props.name}</div>
        <div>{this.props.address.city}, {this.props.address.state}</div>
      </div>
    );
  }
});

let Tabs = React.createClass({
    mixins: [Router.Navigation, Router.State],
    getInitialState: function () {
      return {
        id: 3,
        details: 70,
        users: 142,
        pending: 11,
        categories: 11,
        subcategories: 45,
        apps: 6
      }
    },
    render: function () {
      let view = this.context.getCurrentRoutes()[2].name;
      return (
        <div className="tabs">
          <div onClick={this._select.bind(this, 'details')} className={'details' === view ? 'selected' : ''}>
            <div className="number">{this.state.details}%</div>
            <div className="label">Details</div>
          </div>
          <div onClick={this._select.bind(this, 'users')} className={'users' === view ? 'selected' : ''}>
            <div className="number">{this.state.users}<span className="pending">{this.state.pending}</span></div>
            <div className="label">Users</div>
          </div>
          <div onClick={this._select.bind(this, 'categories')} className={'categories' === view ? 'selected' : ''}>
            <div className="number">{this.state.categories}/{this.state.subcategories}</div>
            <div className="label">Categories</div>
          </div>
          <div onClick={this._select.bind(this, 'apps')} className={'apps' === view ? 'selected' : ''}>
            <div className="number">{this.state.apps}</div>
            <div className="label">Apps</div>
          </div>
        </div>
      )
    },
    _select: function (id) {
      this.transitionTo(id, {id: this.state.id});
    }
});

Admin.Details = React.createClass({
  render: function () {
    return (
      <div>Organization Details</div>
    );
  }
});

Admin.Users = React.createClass({
  render: function () {
    return (
      <div>Manage Users</div>
    );
  }
});

Admin.Categories = React.createClass({
  render: function () {
    return (
      <div>Manage Categories</div>
    );
  }
});

Admin.Apps = React.createClass({
  render: function () {
    return (
      <div>Apps</div>
    );
  }
});

module.exports = Admin;
