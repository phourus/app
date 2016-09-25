import React from 'react'

export default class Create extends React.Component {

  render() {
    return (
      <div className="create">
        <p>Organization not listed? Enter organization name below and click 'Create Organization' to create a new organization.</p>
        <div>
          <span>https://</span>
          <input type="text" placeholder="organization name" value={this.props.shortname} onChange={this._shortname.bind(this)} pattern="[A-Za-z0-9]" />
          <span>.phourus.com</span>
        </div>
        <button className="button green" onClick={this._create.bind(this)}>Create New Organization</button>
      </div>
    )
  }

  _shortname(e) {
    let value = e.currentTarget.value
    //this.setState({shortname: value})
  }

  _create() {
    //this.props.create(this.state.shortname)
  }
}
