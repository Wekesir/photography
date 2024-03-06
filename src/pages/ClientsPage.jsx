import React, { useState } from 'react'
import Clients from '../components/Clients'
import Navbar from '../components/Navbar'
import Sidenav from '../components/Sidenav'

export default function ClientsPage() {


  return (
    <div className='bg-dark container-fluid ps-0' style={{height: '100vh'}}>
        <Navbar />
        <div className="row">
            <div className="col-md-3">
                <Sidenav />
            </div>
            <div className="col-md-9 overflow-y-auto">
                <h5 className="text-white"><i class="bi bi-people-fill"></i> &nbsp; Clients List</h5>
                <Clients />
            </div>
        </div>
    </div>
  )
}
