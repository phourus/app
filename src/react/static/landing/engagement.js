import React from 'react'

import styles from './css/engagement.module.css'

export default class Engagement extends React.Component {

  render() {
    return (
      <div className={styles.engagement}>
        <div className={styles.scale}></div>
        <h2>The Key to Engagement</h2>
        <h4>Maslow's Hierarchy of Needs</h4>
        <div className="gradient">
          <img src="/assets/landing/maslow-horizontal.svg" className={styles.img} />
        </div>
        <h3>Survival</h3>
        <h4>Unengaged</h4>
        <p>Employee's purpose in the company is based on fulfilling psychological needs.</p>
        <div className={styles.pyramid}>
          <img src="/assets/landing/pyramid.png" className={styles.img} />
        </div>
        <ul className={styles.quotes}>
          <li className={styles.quote}>"I just need a paycheck"</li>
          <li className={styles.quote}>"I just want to leave"</li>
          <li className={styles.quote}>"What I do doesn't matter"</li>
          <li className={styles.quote}>"Work is a burden"</li>
        </ul>
        <h3>Low engagement results in:</h3>
        <div className={styles.result}>
          <i className="fa fa-arrow-up" />
          <span className={styles.span}>37%</span>
          <p>more absenteeism</p>
        </div>
        <div className={styles.result}>
          <i className="fa fa-arrow-down" />
          <span className={styles.span}>49%</span>
          <p>more accidents</p>
        </div>
        <div className={styles.result}>
          <i className="fa fa-arrow-down" />
          <span className={styles.span}>16%</span>
          <p>lower profitability</p>
        </div>
        <div className={styles.result}>
          <i className="fa fa-arrow-down" />
          <span className={styles.span}>37%</span>
          <p>lower job growth</p>
        </div>
      </div>
    )
  }
}
