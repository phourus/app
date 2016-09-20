import React from 'react'
import { Link } from 'react-router'
import Nav from './nav'

export default () => {
  return (
    <header className="header">
      <div className="brand">
        <Link to="/home"></Link>
      </div>
      <Nav classType="static" />
    </header>
  )
}
