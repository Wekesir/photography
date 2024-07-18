import React from 'react'
import NewBooking from '../components/newBooking'
import Navbar from '../components/Navbar'
import Sidenav from '../components/Sidenav'

export default function NewBookingsPage() {
  return (
    <div className='bg-dark container-fluid ps-0' style={{height: '100vh'}}>
    <Navbar />
    <div className="row">
        <div className="col-md-3">
            <Sidenav />
        </div>
        <div className="col-md-9 overflow-auto" style={{height: '84.5vh'}}>
            <h5 className="text-white"><i className="bi bi-people-fill"></i> &nbsp; New Booking</h5>
            <NewBooking />
        </div>
    </div>
</div>
  )
}
