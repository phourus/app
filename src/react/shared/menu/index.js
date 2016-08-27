import React from 'react'
import { Link } from 'react-router'

export default class Menu extends React.Component {

  render() {
    return (
      <div className="menu">
        <ul>
          <li><Link to="stream"><i className="fa fa-home" /></Link></li>
          <li><Link to="create"><i className="fa fa-pencil" /></Link></li>
          <li><Link to="activity"><i className="fa fa-line-chart" /></Link></li>
          <li><i className="fa fa-folder" /></li>
          <li><i className="fa fa-group" /></li>
          <li><i className="fa fa-link" /></li>
        </ul>
      </div>
    )
  }
}
