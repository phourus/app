import React from 'react'

import Rich from './rich'

export default ({route, post, owner, saving, create, back, rich}) => {
  if (route.type !== 'create') {
    return false
  }
  return (
    <div>
      <Rich post={post} rich={rich} />
      <button className="button green save" onClick={create} disabled={saving}>
        <i className="fa fa-save" /> Post
      </button>
      <button className="button red delete inverted" onClick={back}>
        <i className="fa fa-close" /> Cancel
      </button>
    </div>
  )
}
