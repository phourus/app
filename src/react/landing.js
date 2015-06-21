"use strict";
let React = require('react');

let Landing = React.createClass({
  render: function () {
    return (
      <div>
        <Truth />
        <Elements />
        <Compete />
        <Start />
      </div>
    );
  }
});

let Truth = React.createClass({
  render: function () {
    return (
      <div className="truth">
        <h2 className="heading">Truth is scarce</h2>
        <p>Whether it be personal truth </p>
        <blockquote>"Who am I?"</blockquote>
        <p>Or in a business</p>
        <blockquote>"Online or traditional advertising?"</blockquote>
        <p>Politics (of course)</p>
        <blockquote>"Is gun control the answer"</blockquote>
        <p>Religion as well</p>
        <blockquote>"Was Jesus a man or divine?"</blockquote>
        <p>And even in education</p>
        <blockquote>"Is the world flat?"</blockquote>
        <p>Truth can be hard to come by in a world run by money...</p>
      </div>
    );
  }
});

let Elements = React.createClass({
  render: function () {
    return (
      <div className="elements">
        <h2 className="heading">Phourus helps you find truth, across the "4 Elements of Society"TM</h2>
        <p>Just like the world is made up of 4 basic elements</p>

        <p>...and a person is made up of</p>

        <p>there are "4 Elements of Society"TM</p>

        <p>made up of</p>
      </div>
    );
  }
});

let Compete = React.createClass({
  render: function () {
    return (
      <div className="compete">
        <h2 className="heading">Through a competitive, social content, the Phourus platform + your brains can get us all one step closer to the truth</h2>
        <p>With a scoring algorithm called "Influence", a competitive, points-driven "Leaders" section, and other tools for content curation, Phourus is your tool for sharing and finding truth.</p>
      </div>
    );
  }
});

let Start = React.createClass({
  render: function () {
    return (
      <div className="start">
        <h2 className="heading">Whether you are an individual or an organization, Phourus can help bring you out of the dark and into the light.</h2>
        <button>Get Started Now</button>
        <button>Learn More</button>
      </div>
    );
  }
});

module.exports = Landing;
