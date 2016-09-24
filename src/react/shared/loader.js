import React from 'react'

export default class Loader extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      slide: 0
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.slide === 3) {
        this.setState({slide: 0})
      } else {
        this.setState({slide: (this.state.slide + 1)})
      }
    }, this.props.speed)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    let opacity = this.props.faded
    let o = [opacity, opacity, opacity, opacity]
    o[this.state.slide] = 1

    return (
      <div className="loader">
        <svg width={this.props.width} version="1.1" id="Logo" x="0px" y="0px" viewBox="20 114 560 560" enableBackground="new 20 114 560 560">
          <g>
          	<g>
          		<path fill="#ED0303" opacity={o[2]} d="M170.3,506.2c6.1-63.2,56.1-112.2,119.3-119.3c-4.1-58.1-52-104-111.2-104c-61.2,0-111.2,50-111.2,111.2
          			C66.3,453.1,112.2,502.1,170.3,506.2z"/>
          	</g>
          	<g>
          		<path fill="#ECB010" opacity={o[3]} d="M191.8,261.4c63.2,6.1,112.2,56.1,119.3,119.3c58.1-4.1,104-52,104-111.2c0-61.2-50-111.2-111.2-111.2
          			C244.8,157.3,195.8,203.2,191.8,261.4z"/>
          	</g>
          	<g>
          		<path fill="#3498DB" opacity={o[0]} d="M317.2,402.1c4.1,58.1,52,104,111.2,104c61.2,0,111.2-50,111.2-111.2c0-59.2-45.9-107.1-104-111.2
          			C430.4,346,380.5,396,317.2,402.1z"/>
          	</g>
          	<g>
          		<path fill="#8ABF00" opacity={o[1]} d="M415.1,527.6c-63.2-6.1-112.2-56.1-119.3-119.3c-58.1,4.1-104,52-104,111.2c0,61.2,50,111.2,111.2,111.2
          			C362.1,631.6,411.1,585.7,415.1,527.6z"/>
          	</g>
          </g>
        </svg>
      </div>
    )
  }
}

Loader.defaultProps = {
  speed: 200,
  faded: 0.4,
  width: 100
}
