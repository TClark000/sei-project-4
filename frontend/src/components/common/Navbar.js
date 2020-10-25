import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar is-primary">
      <div className ="container has-text-weight-bold is-size-6">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">Home</Link>
        </div>
        <div className="navbar-end">
          <Link to="/register" className="navbar-item">Register  </Link>
          <Link to="/login" className="navbar-item">Login  </Link>
          <Link to="/profile" className="navbar-item">Profile  </Link>
          <Link to="/submit" className="navbar-item">Submit an Incident  </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar