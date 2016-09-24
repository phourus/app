import React from 'react'
import moment from 'moment'

export default class History extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      mode: 'views'
    }
  }

  componentDidMount() {
    this.props.actions.history()
  }

  render() {
    let views = this.props.history[0] || []
    let comments = this.props.history[1] || []
    let thumbs = this.props.history[2] || []

    views = views.map((item) => {
      // <img src={"/assets/avatars/1.jpg"} />
      let user = item.user || {}
      return (<li key={item.id}>
        <i className="fa fa-eye" />
        You viewed <a href={"/user/"}>{user.username + "'s"}</a> profile
        <span className="date"> {moment(item.createdAt).fromNow()}</span>
      </li>)
    })
    comments = comments.map((item) => {
      // <img src={`/assets/avatars/${item.post.user.img}.jpg`} />
      return (
        <li key={item.id}>
          <i className="fa fa-comment" /> You commented on
          <a href={"/post/" + item.post.id}>{" \"" + item.post.title + "\""}</a> by
          <a href={`/user/${item.post.user.id}`}> {item.post.user.username}</a>
          <span className="date"> {moment(item.createdAt).fromNow()}</span>
        </li>
      )
    })
    thumbs = thumbs.map((item) => {
      // <img src={`/assets/avatars/${item.post.user.img}.jpg`} />
      return (
        <li key={item.id}>
          <i className={item.positive ? "fa fa-arrow-up green" : "fa fa-arrow-down red"} /> You {(item.positive) ? "": "dis"}liked
          <a href={`/post/${item.post.id}`}>{` \"${item.post.title}\"`}</a> by
          <a href={`/user/${item.post.user.id}`}> {item.post.user.username}</a>
          <span className="date"> {moment(item.createdAt).fromNow()}</span>
        </li>
      )
    })
    return (
      <div className={this.props.selected === 'history' ? "history selected" : "history"}>
        <h3>History</h3>
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
    this.setState({mode: 'comments'})
  }

  _thumbs() {
    this.setState({mode: 'thumbs'});
  }

  _views() {
    this.setState({mode: 'views'});
  }
}
