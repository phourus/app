import React from 'react'
import Router from 'react-router'

import Close from './close'
import Edit from './edit'
import Create from './create'
import Controls from './controls'

export default class Actions extends React.Component {

  render() {
    const { url, owner, post, saving, confirmTrash } = this.props

    return (
      <div className="actions">
        <Close url={url} back={this._back} />
        <Edit url={url} post={post} owner={owner} />
        <Create
          url={url}
          post={post}
          owner={owner}
          saving={saving}
          create={this._create}
          back={this._back}
          rich={this._rich}
        />
        <Controls
          url={url}
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
    this.props.actions.create()
  }

  _update() {
    this.props.actions.save()
  }

  _confirm() {
    this.props.actions.confirm()
  }

  _cancel() {
    this.props.actions.cancel()
  }

  _confirm() {
    this.props.actions.trash()
  }

  _rich() {
    this.props.actions.change('rich', 1)
  }

  _back() {
    // if (!this.history.goBack()) {
    //   if (this.props.url.type === 'edit') {
    //     this.props.history.push("/me");
    //   } else {
    //     this.props.history.push("/stream");
    //   }
    // }
  }

  _myposts() {
    // this.props.history.push("/me");
  }
}
