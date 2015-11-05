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
        <strong>My Organizations</strong>
        <Search />
        <List />
      </div>
    );
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
      placeholder={false}
      options={lookup}
      onChange={this._change} />
  },
  _change: function (value) {
    console.log(value);
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
          if (item.admin === true) {
            admin = <button id={item.org.id} className="button blue" onClick={this._edit}>Admin</button>
          }
          return (
            <div className="org">
              {admin}
              <Link to="orgPosts" params={{id: item.org.id}}>{item.org.name}</Link> <a href="javascript:void(0)" id={item.id} className="remove" onClick={this._remove}>Remove Me</a>
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
    console.warn('remove org' + id);
  }
});

module.exports = Orgs;
