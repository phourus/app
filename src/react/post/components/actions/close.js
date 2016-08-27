import React from 'react'

export default ({route, back}) => {
  if (route.type !== 'post') {
    return false
  }
  return (
    <button className="close" onClick={back}>
      <i className="fa fa-remove" />
    </button>
  )
}