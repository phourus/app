let React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="features">
        <div className="list">
          <div>
            <div className="left">
              <i className="fa fa-lightbulb-o blue" />
            </div>
            <span className="title">Surface Important Content & Ideas</span>
            <p>Flatten organizational hierarchies and eliminate the political effect hindering progressive growth.</p>
            <p className="usage">Phourus uses a unique algorithm called Influence that offsets the popularity of individual users to ensure valuable content gets the visibility it deserves, not because of who said it.</p>
          </div>
          <div>
            <div className="left">
              <i className="fa fa-bolt gold" />
            </div>
            <span className="title">Capture Intellectual Capital</span>
            <p>Are you capturing the full capabilities of the people you invest significant time and effort recruiting and retaining?</p>
            <p className="usage">Use Subjects & Questions on Phourus to enable Subject Matter Experts (SMEs) to create content in their area of expertise for the benefit of the entire organization.</p>
          </div>
          <div>
            <div className="left">
              <i className="fa fa-language green" />
            </div>
            <span className="title">Embrace Real Culture & Diversity</span>
            <p>True culture is not about blue jeans and ping-pong tables. It is about the diverse cultural and socioeconomic backgrounds of each and every employee.</p>
            <p className="usage">Use Beliefs, Debates and other tools of expression built into Phourus to unite and educate a diverse workplace.</p>
          </div>
          <div>
            <div className="left">
              <i className="fa fa-compass red" />
            </div>
            <span className="title">Enhance Vision & Engagement</span>
            <p>Each employee of a business has his or her own idea of what your company is and where is it going. The vision and mission of a business should be an ongoing evolution involving employees and customers alike.</p>
            <p className="usage">Use Beliefs and Quotes to better define your mission and objective, while also engaging employees and acknowledging their contribution to the vision of your business.</p>
          </div>
        </div>
        <div className="post">
          <img src="/assets/product/post.png" />
        </div>
      </div>
    )
  }
})
