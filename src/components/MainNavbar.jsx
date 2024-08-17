import React from 'react'
import '../assets/css/homepage.css'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

export default function MainNavbar() {
  return (
    <>  
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg bg-dark py-3 text-white fxed-top border-bottom border-secondary shadow-sm" id="frontendNav">
            <div className="container-fluid">
              <Link className="navbar-brand text-white d-flex align-middle" to="/">
                <img src={ logo } alt="Logo" width="30" height="24" className="d-inline-block align-text-top mr-2" />
                Lyrics Studios
              </Link>
              <button className="navbar-toggler btn btn-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <i className="bi bi-list text-white"></i>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="#">Gallery</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="#">Features</Link>
                  </li>
                  <li className ="nav-item dropdown">
                    <Link className ="nav-link dropdown-toggle text-white" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="bi bi-box-arrow-in-right"></i> Sign In
                    </Link>
                    <ul className ="dropdown-menu dropdown-menu-dark text-whte">
                      <li><Link className ="dropdown-item" to="/clientAuth">Client Portal</Link></li>
                      <li><Link className ="dropdown-item" to="/login">Admin portal</Link></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div> 
          </nav> 
        </div>
    </>
  )
}
