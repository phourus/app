import React from 'react'

const slides = [
  {text: 'Use Blogs and Ideas to share your general thoughts', img: '/assets/product/post.png'},
  {text: 'Subjects and Questions are for learning and sharing knowledge', img: '/assets/product/post.png'},
  {text: 'Debates and Polls are for polarizing discussions', img: '/assets/product/post.png'},
  {text: 'Quotes and Opinions are for expressing yourself', img: '/assets/product/post.png'}
]
export default class Thoughts extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      slide: 0
    }
  }

  componentDidMount() {
      this.timeout = setInterval(() => {
        let index = this.state.slide
        if (index < 3) {
          index++
        } else {
          index = 0
        }
        this.setState({slide: index})
      }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.timeout)
  }

  render() {
    let { slide } = this.state
    let selected = slides[slide]
    return (
      <div className="thoughts">
        <h2>Stream your thoughts in multiple ways</h2>
        <div className="slides">
          <ul>
            <li onClick={this.select.bind(this, 0)} className={slide === 0 ? 'active' : ''}></li>
            <li onClick={this.select.bind(this, 1)} className={slide === 1 ? 'active' : ''}></li>
            <li onClick={this.select.bind(this, 2)} className={slide === 2 ? 'active' : ''}></li>
            <li onClick={this.select.bind(this, 3)} className={slide === 3 ? 'active' : ''}></li>
          </ul>
        </div>
        <div className="slide">
          <p>{selected.text}</p>
          <div className="posts">
            <img src={selected.img} />
          </div>
        </div>
        <div className="stream">
          <img src="/assets/product/thoughts.png" />
        </div>
      </div>
    )
  }

  select(id) {
    this.setState({slide: id})
  }
}
