import React from 'react'

export default ({post, rich}) => {
    if (post.rich) {
      return (<button className="button gold rich" onClick={rich}>
        <i className="fa fa-font" /> Enable Rich Text
      </button>)
    }
    return <span></span>
}
