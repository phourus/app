import React from 'react'
import { connect } from 'react-redux'

const Links = ({session}) => {
  // 401
  if (!session.authenticated) {
    return (<div className="links 401">
      <h2>You need to login first to view links</h2>
      <p>Please log in or create an account to access this page.</p>
    </div>)
  }

  return (
    <div>
      <h2>Coming Soon</h2>
      <p>Would you like to view all attachments in one central place? Well soon you will be able to with Links! <a href="mailto:info@phourus.com&Subject=Links">Contact us for more information.</a></p>
    </div>
  )
}

const mapState = (state) => {
  return {
    session: state.session
  }
}

export default connect(mapState)(Links)
