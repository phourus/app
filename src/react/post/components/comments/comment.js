import React from 'react'
import Router, { Link } from 'react-router'
import moment from 'moment'

import Pic from '../../../shared/pic'

export default ({comment, user}) => {

  let textarea = ''

  return (
    <div className="comment" id={comment.id}>
			<Pic id={user.id} img={user.img} name={user.username} type='user' />
      <div className="content">
				<Link to={`/${user.username}`} className="username">
					{user.first} {user.last}
				</Link>
        <p>{comment.content}</p>
        <span className="date">{moment(comment.createdAt).fromNow()}</span>
      </div>
      <div className="actions"></div>
    </div>
  )

  /*
  if (owner === true) {
  textarea =   <textarea>{this.props.id}</textarea>
  actions =
  <% if(owner === true){ %>
  <div class="actions-admin">
  <button class="button blue edit">Edit Comment</button>
  <button class="button red delete">Delete Comment</button>
  </div>
  <div class="actions-edit">
  <button class="button green save">Save Changes</button>
  <button class="button red cancel">Cancel</button>
  </div>
  <div class="actions-delete">
  <button class="button green confirm">Confirm Delete</button>
  <button class="button red cancel">Cancel</button>
  </div>
</Link>

  }
  */
}
