import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { page } from '../redux/actions'
import Menu from './menu'

const DEFAULT_PAGE = 'create-account'

import styles from './css/docs.module.css'

class Docs extends React.Component {

  componentDidMount() {
    // this.unsubscribe = Store.listen((data) => {
    //   if (data.page) {
    //     this.setState({page: data.page, menu: false, id: data.id});
    //   }
    // });
    this._route(this.props.params)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.params.id) {
      this._route(nextProps.params)
    }
  }

  render() {
    return (
      <div className={styles.docs}>
        <i className="fa fa-bars" onClick={this._toggle.bind(this)} />
        <div key={this.props.id} className={styles.page}>
          {this.props.page}
        </div>
        <Menu menu={this.props.menu} />
      </div>
    )
  }

  _route(params) {
    let page = ''
    if (params && params.id) {
      this.props.actions.page(params.id)
    } else {
      this.props.actions.page(DEFAULT_PAGE)
    }
  }

  _toggle() {
    //this.setState({menu: !this.state.menu})
  }

  _close() {

  }
}

const mapState = (state) => {
  const {
    page
  } = state.static

  return {
    page
  }
}

const mapDispatch = (dispatch) => {
  return { actions: bindActionCreators({ page }, dispatch) }
}

export default connect(mapState, mapDispatch)(Docs)
