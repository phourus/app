import React from 'react'

export default (props) => {
  return (
    <div className={props.color + " alert"}>
      <button className="remove fa fa-remove" onClick={props.remove.bind(this)}></button>
      <div className="msg">{props.msg}</div>
      <div className="code">HTTP Status Code: {props.code}</div>
    </div>
  )
}
