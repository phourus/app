import React from 'react'

import Contribute from './contribute'
import Thoughts from './thoughts'
import Recognition from './recognition'
import Features from './features'
import Integrate from './integrate'

import styles from './styles.module.css'

export default () => {
  return (
    <div className={styles.product}>
      <Contribute />
      <div className={styles.spacer} />
      <Thoughts />
      <div className={styles.spacer} />
      <Recognition />
      <div className={styles.spacer} />
      <Features />
      <div className={styles.spacer} />
      <Integrate />
    </div>
  )
}
