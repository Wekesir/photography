import React, { useState } from 'react'
import SideNav from '../components/Sidenav'
import Navbar from '../components/Navbar'
import AddClient from '../components/AddClient'
import { isLoggedIn } from '../utils/helpers'
import { useNavigate } from 'react-router-dom'

export default function AddClientsPage() {

  const navigate =useNavigate()

  if( !isLoggedIn ) {
    navigate("/login")
    return null //Prevents the rendering of the rest of the component
  }

  return (
    <div className="container-fluid bg-dark text-white" style={{minHeight:'100vh'}}>
      <Navbar/>      
      <div className="row">
        <div className="col-md-3 p-0">
          <SideNav />
        </div>
        <div className="col-md-9">
          <h4 className=""><i className="bi bi-house"></i> Add Client(s)</h4>
          <AddClient widthClass="col-6"/> 
        </div>
      </div> 
    </div>
  )
}
