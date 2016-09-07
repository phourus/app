import React from 'react';
import { Link } from 'react-router';

let Convert = React.createClass({
  render: function () {
    return (
      <div className="convert">
        <div>
          <input placeholder="email" />
          <button className="button green" onClick={this._register}>Sign Up Now</button>
          Already registered? <Link to="/account">Login here</Link>.
        </div>
      </div>
    );
  },
  _register: function () {
    this.history.pushState(null, "/account");
  }
});

export default Convert;
