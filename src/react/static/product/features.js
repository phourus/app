import React from 'react'

const slides = [
  {
    title: 'Surface Important Content & Ideas',
    text: 'Flatten organizational hierarchies and eliminate the political effect hindering progressive growth.',
    usage: 'Phourus uses a unique algorithm called Influence that offsets the popularity of individual users to ensure valuable content gets the visibility it deserves, not because of who said it.'
  },
  {
    title: 'Capture Intellectual Capital',
    text: 'Are you capturing the full capabilities of the people you invest significant time and effort recruiting and retaining?',
    usage: 'Use Subjects & Questions on Phourus to enable Subject Matter Experts (SMEs) to create content in their area of expertise for the benefit of the entire organization.'
  },
  {
    title: 'Embrace Real Culture & Diversity',
    text: 'True culture is not about blue jeans and ping-pong tables. It is about the diverse cultural and socioeconomic backgrounds of each and every employee.',
    usage: 'Use Beliefs, Debates and other tools of expression built into Phourus to unite and educate a diverse workplace.'
  },
  {
    title: 'Enhance Vision & Engagement',
    text: 'Each employee of a business has his or her own idea of what your company is and where is it going. The vision and mission of a business should be an ongoing evolution involving employees and customers alike.',
    usage: 'Use Beliefs and Quotes to better define your mission and objective, while also engaging employees and acknowledging their contribution to the vision of your business.'
  }
]
export default class Features extends React.Component {

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
      }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.timeout)
  }

  render() {
    return (
      <div className="features">
        <div className="list">
          {slides.map((item, index) => {
            return (
              <div key={index} className={index === this.state.selected ? "selected" : ""}>
                <span className="title">{item.title}</span>
                <p>{item.text}</p>
                <p className="usage">{item.usage}</p>
              </div>
            )
          })}
        </div>
        <div className="post">
          <img src="/assets/product/post.png" />
        </div>
      </div>
    )
  }
}
