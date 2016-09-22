import React from 'react'

import styles from './team.module.css'

const EMPLOYEES = [
  {
    name: 'Jen Wong',
    position: 'UI/UX',
    quote: 'Phourus is the ideal way to organize information for groups and organizations of all sizes',
    img: 'jen'
  },
  {
    name: 'Matt Leddy',
    position: 'Sales',
    quote: 'Department heads can get a real pulse on their team they would otherwise struggle to get without Phourus',
    img: 'matt'
  },
  {
    name: 'Edwin Chu',
    position: 'Business Development',
    quote: 'Training and onboarding employees is so much simpler and more intuitive with Phourus',
    img: 'edwin'
  },
  {
    name: 'Jesse Drelick',
    position: 'Tech',
    quote: 'Managing vast amounts of technical data and specifications is much easier with Phourus than the alternatives',
    img: 'jesse'
  },
  {
    name: 'Gina Chavez',
    position: 'Marketing',
    quote: 'Centralizing marketing materials and opening up strategy debates is an excellent way to improve efficiency',
    img: 'jennie'
  }
]

export default class Team extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }

  componentDidMount() {
    this.timeout = setInterval(() => {
      let { index } = this.state
      if (index < 4) {
        index++
      } else {
        index = 0
      }
      this.setState({index})
    }, 4000)
  }

  componentWillUnmount() {
    clearInterval(this.timeout)
  }

  render() {
    const { index } = this.state
    const selected = EMPLOYEES[index]

    return (
      <div className={styles.team}>
        <div className={styles.photos}>
          {EMPLOYEES.map((item, i) => {
            return <img src={`/assets/avatars/${item.img}.png`} key={i} onMouseOver={this.change.bind(this, i)} className={index === i ? styles.imgSelected : styles.img} />
          })}
        </div>
        <div className={styles.quote}>
          <p>{`"${selected.quote}"`}</p>
          <div className={styles.signature}>
            <div className={styles.name}>{selected.name}</div>
            <div className={styles.position}>{selected.position}</div>
          </div>
        </div>
      </div>
    )
  }

  change(index) {
    this.setState({index: index})
  }
}
