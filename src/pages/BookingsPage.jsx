import React from 'react'
import Bookings from '../components/Bookings';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';

export default function BookingsPage() {

    document.title = "Bookings | Lyrics Photography"

  return (
    <div className="container-fluid bg-dark text-white" style={{minHeight:'100vh'}}>
      <Navbar/>      
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidenav />
        </div>
        <div className="col-md-9">
          <h4 className=""><i className="bi bi-house"></i> Bookings</h4>
          <Bookings /> 
        </div>
      </div> 
    </div>
  )
}
