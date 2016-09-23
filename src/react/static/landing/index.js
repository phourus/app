import React from 'react'
import Auth from '../../auth'
import Ideas from './ideas'
import Information from './information'
import Engagement from './engagement'
import Feedback from './feedback'

import styles from './styles.module.css'

export default class Landing extends React.Component {

  render() {
    return (
      <div className={styles.landing}>
        <div className={styles.banner}>
          <div className={styles.title}>Every company has a story</div>
          <p className={styles.caption}>Make sure you're on the same page</p>
          <Auth {...this.props} ref="auth" showSignup={this._signup} />
        </div>
        <div className={styles.squeeze}>
          <Ideas />
          <Information />
          <Engagement />
          <Feedback />
        </div>
      </div>
    )
  }

  _signup() {
    this.refs.auth._showSignup()
  }
}
