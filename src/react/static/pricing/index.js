import React from 'react'
import Features from '../product/features'
import Team from './team'

import styles from './styles.module.css'

export default class Pricing extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      mode: 'monthly'
    }
  }

  render() {
    let { mode } = this.state
    return (
      <div className={styles.pricing}>
        <div className={styles.squeeze}>
          <h2>Pricing Options</h2>
          <a href="javascript:void(0)" className={mode === 'monthly' ? styles.linkSelected : styles.link} onClick={this.setMode.bind(this, 'monthly')}>Monthly</a>
          <span className="separator">|</span>
          <a href="javascript:void(0)" className={mode === 'annual' ? styles.linkSelected : styles.link} onClick={this.setMode.bind(this, 'annual')}>Annual</a>
          <div className={styles.slider}>
            <img src="/assets/slider.png" className={styles.slide} />
          </div>
          <Features />
          <h2 className={styles.title}>A Message from the Team</h2>
        </div>
        <Team />
      </div>
    )
  }

  setMode(mode) {
    this.setState({mode})
  }
}
