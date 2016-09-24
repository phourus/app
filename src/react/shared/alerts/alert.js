import React from 'react'

export default (props) => {
  return (
    <div className={["alert", props.color].join(' ')}>
      {props.msg}
    </div>
  )
}
