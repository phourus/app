import React from 'react'
import ga from '../../lib/analytics'
import {Link} from 'react-router'

export default class Helper extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }

  render() {
    let className = this.state.active ? "helper active" : "helper"
    return (
      <div className={className}>
        <div className="popout">
          <div className="title">
            <span>Help</span>
            <i className="fa fa-close" onClick={this._inactive.bind(this)} />
          </div>
          <div>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><a href="javascript:void(0)" onClick={this._tutorial.bind(this)}>Tutorial</a></li>
              <li><Link to="/docs">Documentation</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <strong>1-844-PHOURUS</strong><br />
            <div>(1-844-746-8787)</div>
            <a href="mailto:info@phourus.com?Subject=Help">info@phourus.com</a>
            <button className="blue button" onClick={this._chat.bind(this)}><i className="fa fa-comment" /> Chat with us</button>
          </div>
        </div>
        <div className="icon" onClick={this._active.bind(this)}>
          <i className="fa fa-question" />
        </div>
      </div>
    )
  }

  _active() {
    ga('send', 'event', 'helper', 'show')
    this.setState({active: true})
  }

  _inactive() {
    ga('send', 'event', 'helper', 'hide')
    this.setState({active: false})
  }

  _tutorial() {
    ga('send', 'event', 'helper', 'tutorial')
    //TutorialActions.reset()
  }

  _chat() {
    ga('send', 'event', 'helper', 'chat')
  }
}
