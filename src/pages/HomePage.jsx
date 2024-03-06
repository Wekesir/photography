import React from 'react'
import Home from '../components/Home'
import SideNav from '../components/Sidenav'
import Navbar from '../components/Navbar'

export default function HomePage() {
  document.title = "Home | Photography"

  return (
    <div className="container-fluid bg-dark text-white" style={{height:'100vh'}}>
      <Navbar/>      
      <div className="row">
        <div className="col-md-3 p-0">
          <SideNav />
        </div>
        <div className="col-md-9">
          <h4 className=""><i className="bi bi-house"></i> Projects</h4>
        </div>
      </div>
    </div>
  )
}
