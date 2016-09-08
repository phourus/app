import React from 'react'
import Select from 'react-select'

export default class Search extends React.Component {

  componentDidMount() {
    this.props.actions.lookup('')
  }

  render() {
    let lookup = this._lookup()
    let list = this._values()

    return <Select
      allowCreate={false}
      delimiter={'|'}
      value={list}
      matchPos={'start'}
      multi={false}
      placeholder={"find organization"}
      options={lookup}
      onChange={this._change.bind(this)} />
  }

  _change(selected) {
    //MemberActions.request(selected.value);
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
  }

  _lookup() {
    let out = []
    let lookup = this.props.lookup
    if (lookup.forEach) {
      lookup.forEach((item) => {
        out.push({value: item.id, label: item.name + ' (' + item.shortname + ')'})
      })
    }
    return out
  }

  _values() {
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
}
