"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, State, Navigation } = Router;

let ProfileStore = require('../stores/profile');
let ProfileActions = require('../actions/profile');

let Profile = React.createClass({
	mixins: [Navigation],
  getInitialState: function () {
    return {
      context: {}
    }
  },
	componentDidMount: function () {
		this.unsubscribe = ProfileStore.listen((data) => {
      this.setState(data);
		});
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	componentWillReceiveProps: function (data) {
    this.setState(data);
	},
	render: function () {
		let profile = this.state.context.profile || {};
		let address = profile.address || {};
		return (
			<div className="profile">
				<Pic img={profile.img} />
				<div className="basic">
					<h1 className="name">{profile.name || profile.first + ' ' + profile.last}</h1>
					{address.city || address.state ? <div>{address.city}{address.city && address.state ? ", " : ""}{address.state}</div> : false}
					{profile.website ? <div><a href={profile.website} target="_blank">{profile.website}</a></div> : false}
					{profile.phone ? <div>{profile.phone}</div> : false}
					{profile.email ? <div><a href={"mailto:" + profile.email + "&Subject=Phourus"}>{profile.email}</a></div> : false}
				</div>
				<div className="detail">
					<div className={profile.type + " type"}>{profile.type ? profile.type.toUpperCase() : ""}</div>
				</div>
			</div>
		);
	},
	_back: function () {
		this.context.router.transitionTo("orgs");
	}
});

let Pic = React.createClass({
  getInitialState: function () {
    return {
			id: 0,
      img: '/assets/avatars/default.jpg',
      default: '/assets/avatars/default.jpg'
    }
  },
  componentWillReceiveProps: function (data) {
    if (data.img) {
      this.setState(data);
    }
  },
  render: function () {
    return (
      <div className="pic">
				<Link to="orgPosts" params={{id: this.state.id}}>
        	<img src={this.state.img} onError={this._default} />
				</Link>
      </div>
    );
  },
  _default: function () {
    this.setState({img: this.state.default});
  }
});

module.exports = Profile;
