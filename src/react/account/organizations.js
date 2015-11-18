"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, Navigation } = Router;
let Store = require('../../stores/account');
let Actions = require('../../actions/account');

let Select = require('react-select');

let Orgs = React.createClass({
  render: function () {
    return (
      <div className="orgs">
        <h3>My Organizations</h3>
        <Search />
        <Create />
        <List />
      </div>
    );
  }
});

let Create = React.createClass({
  getInitialState: function () {
    return {
      name: ""
    };
  },
  render: function () {
    return (
      <div className="create">
        <p>Organization not listed? Enter organization name below and click 'Create Organization' to create a new organization.</p>
        <input type="text" placeholder="organization name" value={this.state.name} onChange={this._name} />
        <button className="button green" onClick={this._create}>Create New Organization</button>
      </div>
    );
  },
  _name: function (e) {
    let value = e.currentTarget.value;
    this.setState({name: value});
  },
  _create: function () {
    Actions.createOrganization(this.state.name);
  }
});

let Search = React.createClass({
  getInitialState: function () {
    return {
      lookup: []
    }
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen((data) => {
      if (data.lookup) {
        this.setState({lookup: data.lookup});
      }
    });
    Actions.lookup('');
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    let lookup = this._lookup();
    let list = this._values();
    return <Select
      allowCreate={false}
      delimiter={'|'}
      value={list}
      matchPos={'start'}
      multi={false}
      placeholder={"find organization"}
      options={lookup}
      onChange={this._change} />
  },
  _change: function (value) {
    Actions.joinOrganization(value);
    // let current = this._values().map((data) => {
    //   return data.value;
    // });
    // let updated = value.split('|');
    // let diff = this._diff(updated, current);
    // if (!diff) {
    //   return;
    // }
    // if (diff.action === 'add') {
    //   let model = {postId: this.props.post.id};
    //   if (diff.type === 'user') {
    //     model.userId = diff.id;
    //   } else if (diff.type === 'team') {
    //     model.teamId = diff.id;
    //   } else {
    //     return;
    //   }
    //   ActionsCollaborators.add(model);
    // }
    // if (diff.action === 'remove') {
    //   ActionsCollaborators.remove(diff.type, diff.id);
    // }
  },
  _lookup: function () {
    let out = [];
    let lookup = this.state.lookup;
    if (lookup.forEach) {
      lookup.forEach((item) => {
        out.push({value: item.id, label: item.name + ' (' + item.shortname + ')'});
      });
    }
    return out;
  },
  _values: function () {
    // let list = this.state.list;
    // if (list && list.map) {
    //   return list.map((item) => {
    //     if (item.user) {
    //       let user = item.user;
    //       return {value: 'user:' + item.userId, label: user.first + ' ' + user.last};
    //     }
    //     if (item.team) {
    //       return {value: 'team:' + item.teamId, label: 'Team: ' + item.team.name};
    //     }
    //     return false;
    //   });
    // }
    // return [];
  }
});

let List = React.createClass({
  mixins: [Navigation],
  getInitialState: function () {
    return {
      orgs: []
    }
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen((data) => {
      if (data.orgs) {
        this.setState({orgs: data.orgs});
      }
    });
    Actions.orgs();
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    return (
      <div className="list">
        {this.state.orgs.map((item) => {
          var admin = false;
          if (item.admin === true && item.approved) {
            admin = <button id={item.org.id} className="button blue" onClick={this._edit}>Admin</button>
          }
          return (
            <div className="org">
              {admin}<br />
              <Link to="orgPosts" params={{id: item.org.id}}>{item.org.name}</Link><br />
              {item.approved
                ? <span className="approved">
                  <i className="fa fa-check" /> Approved
                </span>
                : <span className="pending">
                  <i className="fa fa-clock-o" /> Pending
                </span>
              }
              <a href="javascript:void(0)" id={item.id} className="remove" onClick={this._remove}>
                {item.approved ? ' Remove Me' : ' Cancel Request'}
              </a><br />
              <div style={{clear: 'right'}}></div>
            </div>
          );
        })}
      </div>
    );
  },
  _edit: function (e) {
    var id = e.currentTarget.id;
    this.context.router.transitionTo('details', {id: id});
  },
  _remove: function (e) {
    var id = e.currentTarget.id;
    Actions.removeOrganization(id);
  }
});

module.exports = Orgs;
