import React from 'react'
import Router, { Link } from 'react-router'

export default ({content, change, add}) => {

  return (
    <div className="create">
      <div className="pic">
        <Link to="/account">
          <img src={"/assets/avatars/1.jpg"} />
        </Link>
      </div>
      <textarea ref="comment" placeholder="Enter your comment here" value={content} onChange={change} />
      <button className="button green add" onClick={add}>
        <i className="fa fa-comment" /> Post Comment
      </button>
    </div>
  )
}
