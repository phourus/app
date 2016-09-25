import React from 'react'
import { connect } from 'react-redux'

const Folders = ({session}) => {
  // 401
  if (!session.authenticated) {
    return (<div className="folders 401">
      <h2>You need to login first to view folders</h2>
      <p>Please log in or create an account to access this page.</p>
    </div>)
  }

  return (
    <div>
      <h2>Coming Soon</h2>
      <p>Would you like to organize posts in a way that works best for you? Well soon you will be able to with Folders! <a href="mailto:info@phourus.com&Subject=Folders">Contact us for more information.</a></p>
    </div>
  )
}

const mapState = (state) => {
  return {
    session: state.session
  }
}

export default connect(mapState)(Folders)
