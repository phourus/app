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
        <Close url={url} back={this._back.bind(this)} />
        <Edit url={url} post={post} owner={owner} />
        <Create
          url={url}
          post={post}
          owner={owner}
          saving={saving}
          create={this._create.bind(this)}
          back={this._back.bind(this)}
          rich={this._rich.bind(this)}
        />
        <Controls
          url={url}
          post={post}
          owner={owner}
          saving={saving}
          confirmTrash={confirmTrash}
          confirm={this._confirm.bind(this)}
          cancel={this._cancel.bind(this)}
          trash={this._trash.bind(this)}
          update={this._update.bind(this)}
          rich={this._rich.bind(this)}
          myposts={this._myposts.bind(this)}
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

  _trash() {
    this.props.actions.trash()
  }

  _rich() {
    this.props.actions.change('rich', 1)
  }

  _back() {
    if (!this.props.history.goBack()) {
      if (this.props.url.type === 'edit') {
        this.props.history.push("/me")
      } else {
        this.props.history.push("/stream")
      }
    }
  }

  _myposts() {
    this.props.history.push("/me")
  }
}
