import React from 'react'

import styles from './css/ideas.module.css'

const SLIDES = [
  {
    title: 'The Sticky Note',
    text: "Did you know that the sticky note came from a scientist who made a \
    semi-sticky adhesive that didn't know what to do with it? With some \
    discussion and collaboration, this mistake became a $3 billion branch of 3M",
    img: 'stickynote',
    next: 'Prime ideas from Amazon'
  },
  {
    title: 'Amazon Prime',
    text: "Did you know that the sticky note came from a scientist who made a \
    semi-sticky adhesive that didn't know what to do with it? With some \
    discussion and collaboration, this mistake became a $3 billion branch of 3M",
    img: 'amazon',
    next: 'American Airlines'
  },
  {
    title: 'American Airlines',
    text: "Did you know that the sticky note came from a scientist who made a \
    semi-sticky adhesive that didn't know what to do with it? With some \
    discussion and collaboration, this mistake became a $3 billion branch of 3M",
    img: 'americanairlines',
    next: 'The Lion King'
  },
  {
    title: 'The Lion King',
    text: "Did you know that the sticky note came from a scientist who made a \
    semi-sticky adhesive that didn't know what to do with it? With some \
    discussion and collaboration, this mistake became a $3 billion branch of 3M",
    img: 'lionking',
    next: 'The Sticky Note'
  }
]
export default class Ideas extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: 0
    }
  }

  componentDidMount() {
      this.timeout = setInterval(() => {
        let index = this.state.selected
        if (index < 3) {
          index++
        } else {
          index = 0
        }
        this.setState({selected: index})
      }, 6000)
  }

  componentWillUnmount() {
    clearInterval(this.timeout)
  }

  render() {
    let { selected } = this.state
    let slide = SLIDES[selected]
    let slides = SLIDES.slice()
    slides.splice(selected, 1)

    return (
      <div className={styles.ideas}>
        <div className={styles.slides}>
          <ul>
            {slides.map((item, index) => {
              return <li key={item.img} onClick={this.select.bind(this, index)} className={styles.item}><img src={`/assets/landing/${item.img}.jpg`} /></li>
            })}
          </ul>
        </div>
        <h2 className={styles.heading}>Find Great Ideas</h2>
        <img src={`/assets/landing/${slide.img}.jpg`} className={styles.img} />
        <h4 className={styles.title}>{slide.title}</h4>
        <p className={styles.text}>
          {slide.text}
          <br /><br />
          <a href="" >Next: {slide.next} &raquo;</a>
        </p>
      </div>
    )
  }

  select(index) {
    this.setState({selected: index})
  }
}
