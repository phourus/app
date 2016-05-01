import React from 'react'
import Features from '../product/features'

const employees = [
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
      <div className="pricing">
        <div className="squeeze">
          <h2>Pricing Options</h2>
          <a href="javascript:void(0)" className={mode === 'monthly' ? "selected" : ""} onClick={this.setMode.bind(this, 'monthly')}>Monthly</a>
          <span className="separator">|</span>
          <a href="javascript:void(0)" className={mode === 'annual' ? "selected" : ""} onClick={this.setMode.bind(this, 'annual')}>Annual</a>
          <div className="slider">
            <img src="/assets/slider.png" />
          </div>
          <Features />
          <h2 className="title">A Message from the Team</h2>
        </div>
        <Team />
      </div>
    )
  }

  setMode(mode) {
    this.setState({mode})
  }
}

class Team extends React.Component {

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

  componentWillUmount() {
    clearInterval(this.timeout)
  }

  render() {
    let { index } = this.state
    let selected = employees[index]
    return (
      <div className="team">
        <div className="photos">
          {employees.map((item, i) => {
            return <img src={`/assets/avatars/${item.img}.png`} key={i} onMouseOver={this.change.bind(this, i)} className={index === i ? 'selected' : ''} />
          })}
        </div>
        <div className="quote">
          <p>{`"${selected.quote}"`}</p>
          <div className="signature">
            <div className="name">{selected.name}</div>
            <div className="position">{selected.position}</div>
          </div>
        </div>
      </div>
    )
  }

  change(index) {
    this.setState({index: index})
  }
}
