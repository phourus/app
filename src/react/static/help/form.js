import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { contact } from '../redux/actions'

class Form extends React.Component {

  componentDidMount() {
    let session = this.props.session
    let user = session.user
    if (user && user.email) {
      //this.setState({email: user.email})
    }
    // this.unsubscribe = Store.listen((data) => {
    //   if (data.code === 200) {
    //     this.setState({email: "", message: "", code: 200});
    //   }
    // });
  }

  render() {
    return (
      <div className="form">
        <label>Your Email:</label>
        <input type="text" value={this.props.email} onChange={this._email.bind(this)} />
        <label>Your Message:</label>
        <textarea value={this.props.message} onChange={this._message.bind(this)} />
        {this.props.code === 200 ? <div className="green">Your message has been received</div> : false}
        <button className="button green" onClick={this._submit.bind(this)}>Submit</button>
      </div>
    )
  }

  _email(e) {
    //this.setState({email: e.currentTarget.value});
  }

  _message(e) {
    //this.setState({message: e.currentTarget.value});
  }

  _submit() {
    ga('send', 'event', 'contact', 'submit', this.props.email);
    this.props.actions.contact(this.props.email, this.props.message);
  }
}

const mapState = (state) => {
  return {
    session: {}
  }
}

const mapDispatch = (dispatch) => {
  return { actions: bindActionCreators({ contact }, dispatch) }
}

export default connect(mapState, mapDispatch)(Form)
