import React from 'react'

import Rich from './rich'

export default ({url, post, owner, saving, create, back, rich}) => {
  if (url.type !== 'create') {
    return <span></span>
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
