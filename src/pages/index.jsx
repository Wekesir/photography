import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function index() {
  return (
    <>
      <div className="container-fluid p-0">

        <nav className="navbar navbar-expand-lg bg-dark text-white">
          <div className="container-fluid">
            <Link className="navbar-brand text-white" to="#">
              <img src="#" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
              Lyrics Studios
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active text-white" aria-current="page" to="#">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">Features</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">Pricing</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " aria-disabled="true">Disabled</Link>
                </li>
              </ul>
            </div>
          </div> 
        </nav> 
        
      </div> 

    </>
  )
}
