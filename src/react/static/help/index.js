import React from 'react'
import { Link } from 'react-router'

import Form from './form'
import Docs from './docs'

import styles from './styles.module.css'

export default class Help extends React.Component {

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.faq}>
          <h1>Help & Docs</h1>
          <input className={styles.input} type="text" placeholder="what can we help you with?" />
          <Docs {...this.props} />
        </div>
        <div className={styles.contact}>
          <h2>Contact us</h2>
          <Form />
          <h4>Additional Assistance</h4>
          <button className="button blue" onClick={this._docs.bind(this)}>Chat with us</button>
          <p>1-844-PHOURUS</p>
          <a href='mailto:info@phourus.com?Subject=Support'>info@phourus.com</a>
        </div>
        <br style={{clear: "right"}} />
        <br />
      </div>
    )
  }

  _docs() {
    this.props.history.push("/docs")
  }
}
