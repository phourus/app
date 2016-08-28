import React from 'react'
import Router from 'react-router'

import Close from './close'
import Edit from './edit'
import Create from './create'
import Controls from './controls'

export default class Actions extends React.Component {

  render() {
    const { route, owner, post, saving, confirmTrash } = this.props

    return (
      <div className="actions">
        <Close route={route} back={this._back} />
        <Edit route={route} post={post} owner={owner} />
        <Create
          route={route}
          post={post}
          owner={owner}
          saving={saving}
          create={this._create}
          back={this._back}
          rich={this._rich}
        />
        <Controls
          route={route}
          post={post}
          owner={owner}
          saving={saving}
          confirmTrash={confirmTrash}
          confirm={this._confirm}
          cancel={this._cancel}
          trash={this._trash}
          update={this._update}
          rich={this._rich}
          myposts={this._myposts}
        />
      </div>
    )
  }

  _create() {
    this.props.dispatch(this.props.actions.create())
  }

  _update() {
    this.props.dispatch(this.props.actions.save())
  }

  _confirm() {
    this.props.dispatch(this.props.actions.confirm())
  }

  _cancel() {
    this.props.dispatch(this.props.actions.cancel())
  }

  _confirm() {
    this.props.dispatch(this.props.actions.trash())
  }

  _rich() {
    this.props.dispatch(this.props.actions.change('rich', 1))
  }

  _back() {
    // if (!this.history.goBack()) {
    //   if (this.props.route.type === 'edit') {
    //     this.history.pushState(null, "/me");
    //   } else {
    //     this.history.pushState(null, "/stream");
    //   }
    // }
  }

  _myposts() {
    // this.history.pushState(null, "/me");
  }
}
