import React from 'react'

import styles from './css/feedback.module.css'

export default () => {
  return (
    <div className={styles.feedback}>
      <h2>Get better feedback</h2>
      <p>For two-fold returns</p>
      <img src="/assets/landing/bad.png" />
      <img src="/assets/landing/good.png" />
    </div>
  )
}
