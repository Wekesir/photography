import React from 'react'
import UpdateProfile from '../components/UpdateProfile'
import Navbar from '../components/Navbar';
import SideNav from '../components/Sidenav';

export default function ProfilePage() {

  document.title = "Update profile | Lyrics Photography";

  return (
    <div className="container-fluid bg-dark text-white" style={{minHeight:'100vh'}}>
      <Navbar/>      
      <div className="row">
        <div className="col-md-3 p-0">
          <SideNav />
        </div>
        <div className="col-md-9">
          <h4 className="d-flex align-items-center"><i className="bi bi-person-fill"></i> Profile</h4>
          <UpdateProfile />
        </div>
      </div>
    </div>
  )
}
