import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import bg_video from '../assets/photography_bg.mp4'
import logo from '../assets/logo.png'
import '../assets/css/homepage.css'

import MainNavbar from '../components/MainNavbar'

export default function index() {

  document.title = "Lyrics Photography"

  return (
    <>
      <div className="container-fluid p-0 bg-dark overflow-x-hidden">       

        <section>
            <MainNavbar />
        </section>

        <section id="backroundVideo" style={{ position: 'relative' }}>

          <video autoPlay loop muted>
            <source src={ bg_video } type="video/mp4" />
          </video>

          <div id="textOverlayDiv" className="text-center">
              <p>
                Welcome to <br />
                Lyrics Photography
              </p>

              <button className='btn btn-primary text-center py-3 px-5 gradient-background fw-bold'>Get Started</button>
          </div>  

        </section>        
        
      </div> 

    </>
  )
}
