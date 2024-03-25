import React from 'react'
import { useNavigate } from 'react-router-dom'
import Home from '../components/Home'
import SideNav from '../components/Sidenav'
import Navbar from '../components/Navbar'
import { isLoggedIn } from '../utils/helpers'

export default function HomePage() {
  document.title = "Home | Photography"

  const navigate = useNavigate()

  (!isLoggedIn) && navigate("/login")

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
