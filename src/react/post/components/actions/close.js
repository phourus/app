import React from 'react'

export default ({url, back}) => {
  if (url.type !== 'post') {
    return <span></span>
  }
  return (
    <button className="close" onClick={back.bind(this)}>
      <i className="fa fa-remove" />
    </button>
  )
}
