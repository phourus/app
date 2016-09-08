import React from 'react'
import Select from 'react-select'
import { Link } from 'react-router'

import Search from './search'
import Create from './create'
import List from './list'

export default class Orgs extends React.Component {

  render() {
    return (
      <div className="orgs">
        <h3>My Organizations</h3>
        <Search {...this.props} />
        <Create {...this.props} />
        <List {...this.props} />
      </div>
    )
  }
}
