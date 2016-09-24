import React from 'react'
import moment from 'moment'

export default class Notifications extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      mode: 'views'
    }
  }

  componentDidMount() {
    this.props.actions.notifications()
  }

  render() {
    let views = this.props.notifications[0] || []
    let comments = this.props.notifications[1] || []
    let thumbs = this.props.notifications[2] || []

    views = views.map(function (item) {
      //<img src={`/assets/avatars/${item.viewer.img}.jpg`} />
      return (<li key={item.id}>
        <i className="fa fa-eye" />
        <a href={`/user/${item.viewer.id}`}>{item.viewer.username}</a> viewed your profile
        <span className="date"> {moment(item.createdAt).fromNow()}</span>
      </li>)
    })
    comments = comments.map(function (item) {
      //<img src={`/assets/avatars/${item.user.img}.jpg`} />
      return (
        <li key={item.id}>
          <i className="fa fa-comment" />
          <a href={`/user/${item.userId}`}>{item.user.username}</a> commented on your post
          <a href={`/post/${item.post.id}`}>{` \"${item.post.title}\"`}</a>
          <span className="date"> {moment(item.createdAt).fromNow()}</span>
        </li>
      )
    })
    thumbs = thumbs.map(function (item) {
      // <img src={`/assets/avatars/${item.user.img}.jpg`} />
      return (
        <li key={item.id}>
          <i className={(item.positive) ? "fa fa-arrow-up green": "fa fa-arrow-down red"} />
          <a href={`/user/${item.user.id}`}>{item.user.username}</a> {(item.positive) ? "": "dis"}liked your post
          <a href={`/post/${item.post.id}`}>{` \"${item.post.title}\"`}</a>
          <span className="date"> {moment(item.createdAt).fromNow()}</span>
        </li>
      )
    })
    return (<div className={this.props.selected === 'history' ? "notifications" : "notifications selected"}>
      <h3>Notifications</h3>
      <div className="tabs">
        <div onMouseOver={this._comments.bind(this)}><div>{comments.length}</div>Comments</div>
        <div onMouseOver={this._thumbs.bind(this)}><div>{thumbs.length}</div>Thumbs</div>
        <div onMouseOver={this._views.bind(this)}><div>{views.length}</div>Views</div>
      </div>
      {this.state.mode === 'comments' ? <ul>{comments}</ul> : false}
      {this.state.mode === 'thumbs' ? <ul>{thumbs}</ul> : false}
      {this.state.mode === 'views' ? <ul>{views}</ul> : false}
    </div>)
  }

  _comments() {
    this.setState({mode: 'comments'});
  }

  _thumbs() {
    this.setState({mode: 'thumbs'});
  }

  _views() {
    this.setState({mode: 'views'});
  }
}
