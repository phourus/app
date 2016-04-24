let React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="ideas">
        <div>
            <h2 className="ideasTitle">Find Great Ideas</h2>
            <section className="ideaLogos">
                <img className="ameriLogo" src="../assets/logos/amairlines-6.jpg"/>
                <img className="amazLogo" src="../assets/logos/amazon-prime-logo1-150x150.jpg"/>
                <img className="lionLogo" src="../assets/logos/musical-logo.gif"/>
            </section>
        </div>
        <div className="slides"></div>
        <h4>The Sticky Note</h4>
        <p>Did you know that the sticky note came from a scientist who made a
        semi-sticky adhesive that didn't know what to do with it? With some
        discussion and collaboration, this mistake became a $3 billion branch of 3M</p>
        <a href="">Next: American Airlines &raquo;</a>
      </div>
    )
  }
})
