import React from 'react'
import { Link } from 'react-router'

import styles from './styles.module.css'

export default (props) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        <span>© 2015 Phourus Inc. </span>
        <Link to="/terms" className={styles.link}>Terms </Link>
        <Link to="/privacy" className={styles.link}>Privacy</Link>
        <br/ >
        <span className={styles.muted}>1411 7th St. #305, Santa Monica, CA 90401</span>
      </div>
      <div className={styles.contact}>
        <strong>1-844-PHOURUS </strong><br />
        <a href="mailto:info@phourus.com&Subject=">info@phourus.com</a>
      </div>
    </footer>
  )
}
