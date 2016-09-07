let React = require('react');

let Actions = require('../../../actions/util');
let Store = require('../../../stores/util');

module.exports = React.createClass({
  contextTypes: {
    session: React.PropTypes.object
  },
  getInitialState: function () {
    return {
      email: "",
      message: ""
    };
  },
  componentDidMount: function () {
    let session = this.context.session;
    let user = session.user;
    if (user && user.email) {
      this.setState({email: user.email});
    }
    this.unsubscribe = Store.listen((data) => {
      if (data.code === 200) {
        this.setState({email: "", message: "", code: 200});
      }
    });
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    return (
      <div className="form">
        <label>Your Email:</label>
        <input type="text" value={this.state.email} onChange={this._email} />
        <label>Your Message:</label>
        <textarea value={this.state.message} onChange={this._message} />
        {this.state.code === 200 ? <div className="green">Your message has been received</div> : false}
        <button className="button green" onClick={this._submit}>Submit</button>
      </div>
    );
  },
  _email: function (e) {
    this.setState({email: e.currentTarget.value});
  },
  _message: function (e) {
    this.setState({message: e.currentTarget.value});
  },
  _submit: function () {
    ga('send', 'event', 'contact', 'submit', this.state.email);
    Actions.contact(this.state.email, this.state.message);
  }
});
