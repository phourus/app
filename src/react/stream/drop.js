import React from 'react'
import {DropTarget} from 'react-dnd'

let target = {
  drop(props, monitor, component) {
    let item = monitor.getItem()
    this.props.actions.save(item.id, props.item.id)
    return {
      postId: item.id,
      folderId: props.item.id
    }
  }
}

let collect = function (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

const Drop = (props) => {
  let className = []
  let item = props.item
  let index = props.index
  let isOver = props.isOver
  let connectDropTarget = props.connectDropTarget

  if (index === props.selected) {
    className.push('selected')
  }
  if (isOver) {
    className.push('over')
  }

  return connectDropTarget(
    <li key={item.name} className={className.join(' ')}>
      <a id={'id' + item.id} href="javascript:void(0)" onClick={props.select}>
        <span className="title">{item.name}</span><br />
      </a>
      {index === props.selected && 0
        ? <ul>
          <li>Social Media</li>
          <li>Search Engine Management</li>
          <li>Direct</li>
          <li><input /><button>Add subfolder</button></li>
          </ul>
        : false
      }
    </li>
  )
}

export default DropTarget('posts', target, collect)(Drop)
