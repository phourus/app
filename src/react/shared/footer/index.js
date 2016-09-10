import React from 'react'

import { Link } from 'react-router'
import styles from './styles.less'

export default function(props) {

  return (
    <footer className="footer">
      <strong>1-844-PHOURUS</strong><br />
      <span className="muted">(1-844-746-8787)</span><br />
      <a href="mailto:info@phourus.com&Subject=">info@phourus.com</a><br /><br />
      <span>© 2015 Phourus Inc. All Rights Reserved.</span><br />
      <span className="muted">1411 7th St. #305, Santa Monica, CA 90401</span><br />
      <Link to="/terms" className="muted">Terms</Link> |
      <Link to="/privacy" className="muted">Privacy</Link>
      <br style={{clear: "all"}}  />
    </footer>
  )
}
