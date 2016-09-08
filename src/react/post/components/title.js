import React from 'react'
import Router, { Link } from 'react-router'

export default class Title extends React.Component {

  render() {
    let username = 'post';
    let { url, post, owner } = this.props
    if (post.user && post.user.username) {
      username = post.user.username
    }
    return (
      url.type === 'create' || url.type === 'edit' && owner
        ? <input className="title editing" onChange={this._title} defaultValue={post.title} />
        : <h2 className="title"><Link to={`/${username}/${post.slug}`}>{post.title}</Link></h2>
    )
  }

  _title(e) {
    //Actions.change('title', e.currentTarget.value);
  }
}
