import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className ="container has-text-weight-bold is-size-6">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">Home</Link>
          <a role="button" 
            className="navbar-burger burger" 
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarHeader"
            onClick={() => {
              var burger = document.querySelector('.burger')
              var nav = document.querySelector('#navbarHeader')
              burger.classList.toggle('is-active')
              nav.classList.toggle('is-active')
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbarHeader" className="navbar-menu">
          <div className="navbar-end">
            <Link to="/register" className="navbar-item">Register  </Link>
            <Link to="/login" className="navbar-item">Login  </Link>
            <Link to="/profile" className="navbar-item">Profile  </Link>
            <Link to="/submit" className="navbar-item">Submit an Incident  </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar