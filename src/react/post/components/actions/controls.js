import React from 'react'

import Rich from './rich'

export default ({route, post, owner, saving, confirmTrash, confirm, cancel, trash, update, rich, myposts}) => {
  if (!owner) {
    return <span></span>
  }
  if (route.type !== 'edit') {
    return <span></span>
  }
  if (confirmTrash) {
    return (
      <div>
        <button className="button red delete" onClick={confirm} disabled={saving}>
          <i className="fa fa-trash" /> Confirm Delete
        </button>
        <button className="button red delete inverted" onClick={cancel}>
          <i className="fa fa-remove" /> Cancel Delete
        </button>
      </div>
    )
  }
  return (
    <div>
      <Rich post={post} rich={rich} />
      <button className="button green save" onClick={update} disabled={saving}>
        <i className="fa fa-save" /> {saving ? 'Saving' : 'Save Changes'}
      </button>
      <button className="button red delete inverted" onClick={trash}>
        <i className="fa fa-trash" /> Delete
      </button>
      <button className="button blue myposts inverted" onClick={myposts}>
        <i className="fa fa-arrow-left" /> Back to My Posts
      </button>
    </div>
  )
}
