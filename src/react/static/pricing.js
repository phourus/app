import React from 'react'
import Features from '../product/features'

export default class Pricing extends React.Component {

  render() {

    return (
      <div className="pricing">
        <h1>Pricing Options</h1>
        <div className="slider">
          <img src="/assets/slider.png" />
        </div>
        <a href="">Monthly</a> | <a href="">Annual</a>
        <Features />
        <Team />
      </div>
    )
  }
}

class Team extends React.Component {

  render() {
    return (
      <div className="team">
        <div className="photos">
          <img src="/assets/avatars/jen.png" />
          <img src="/assets/avatars/matt.png" />
          <img src="/assets/avatars/edwin.png" />
          <img src="/assets/avatars/jesse.png" />
          <img src="/assets/avatars/jennie.png" />
        </div>
        <div className="quote">
          <p>Some text goes here that describes how the employee feels about the product</p>
          <div className="signature">
            Jen Wong
            UX Specialist
          </div>
        </div>
      </div>
    )
  }
}
