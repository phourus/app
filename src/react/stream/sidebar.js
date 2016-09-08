import React from 'react'
import Drop from './drop'

export default class Sidebar extends React.Component {

  componentDidMount() {
    this.props.actions.collection()
  }

  render() {
    let folders = this.props.folders
    if (folders[0] && folders[0].id !== 0) {
      folders.unshift({id: 0, name: 'All Posts'})
    }

    if (!this.props.sidebarVisible) {
      return false
    }
    return (
      <div id="sidebar">
        <button className="toggle" onClick={this.props.sidebar}><i className="fa fa-angle-right" /> Collapse Sidebar</button>
        <ul>
          {folders.map((item, index) => {
            return (
              <Drop key={item.id} item={item} index={index} select={this._select.bind(this)} selected={this.props.selected} />
            )
          })}
        </ul>
      </div>
    )
  }

  _select(e) {
    let id = e.currentTarget.id
    id = id.replace('id', '')
    this.props.actions.folder(id)
    //this.setState({selected: parseInt(id)})
  }
}
