import React from 'react'
import {Link} from 'react-router'
import ga from './lib/analytics'
let Initializer = ga.Initializer

import Header from './react/shared/header'
import Footer from './react/shared/footer'
import Menu from './react/shared/menu'
import Profile from './react/shared/profile'
import Tutorial from './react/shared/tutorial'
import Helper from './react/shared/helper'
import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'
import processURL from './react/url'

import styles from './less/style.less'
import formStyles from './less/sub/forms.less'
import buttonStyles from './less/sub/buttons.less'
import chartStyles from './less/sub/charts.less'

import helperStyles from './less/sub/helper.less'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      sidebarVisible: false,
      tint: null,
      url: {
        route: [],
        params: {},
        query: {},
        root: '',
        id: '',
        type: ''
      }
    }
  }

  componentDidMount() {
    this._url(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this._url(nextProps)
  }

  render() {
    let classType = "product"
    let className = "main"
    const url = this.state.url
    const root = url.root

    if (root === 'stream') {
        className += " sidebar"
    }
    if (this.state.sidebarVisible) {
      className += " visible"
    }
    if (['product', 'pricing', 'help', 'privacy', 'terms'].indexOf(root) > -1) {
      classType = "static"
    }
    if (root === 'home') {
      classType = "home"
    }
    if (!root && !url.subdomain) {
      classType = "home"
    }
    // <Tutorial />

    return  (
      <div id="app" className={classType}>
        <Menu />
        <div className="container">

          <Initializer />
          <Header url={url} tintOn={this._tintOn} tintOff={this._tintOff} tint={this.state.tint} />
          {this.state.tint ? <div className="tint" onClick={this._tintOff}></div> : false}
          <div className="spacer"></div>
          <Profile url={url} />
          <div>
            <div id="content">
              {React.cloneElement(this.props.children, { url })}
            </div>
          </div>
          <Helper />
          <Footer />
        </div>
      </div>
    )
  }

  _tintOn() {
    this.setState({tint: true})
  }

  _tintOff() {
    this.setState({tint: null})
  }

  _url(nextProps) {
    const url = processURL(nextProps)
    this.setState({ url })
  }
}

export default DragDropContext(HTML5Backend)(App)
