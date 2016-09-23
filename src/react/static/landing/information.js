import React from 'react'

import styles from './css/information.module.css'

export default () => {

  return (
    <div className={styles.information}>
      <h2>Centralize Research & Information</h2>
      <p>Improving access to information can help yield anywhere from a 38-600%
        return on investment. How often is your team looking for information
        they can't find and recreating documents that already exist? According
        to the following statistics, on average knowledge workers lose:</p>
      <a href="">How inefficient is your knowledge management? &raquo;</a><br /><br />
      <div className={styles.stat}>
        <img src="/assets/landing/searching.svg" className={styles.img} />
        <h3>3.7 hours lost per week</h3>
        <p>inefficient content search</p>
      </div>
      <div className={styles.stat}>
        <img src="/assets/landing/time.svg" className={styles.img} />
        <h3>2.5 hours lost per week</h3>
        <p>inefficient content search</p>
      </div>
      <div className={styles.stat}>
        <img src="/assets/landing/cost.svg" className={styles.img} />
        <h3>$10k+ lost per year</h3>
        <p>per knowledge worker</p>
      </div>
    </div>
  )
}
