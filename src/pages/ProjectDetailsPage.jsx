import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectDetails from '../components/ProjectDetails'
import Sidenav from '../components/Sidenav'
import Navbar from '../components/Navbar'
import { isLoggedIn } from '../utils/helpers'

export default function ProjectDetailsPage() {

    document.title = "Project Details | Lyrics Photography"

    const navigate = useNavigate()

    (!isLoggedIn) && navigate("/login")

    return (
      <div className='bg-dark container-fluid ps-0' style={{height: '100vh'}}>
          <Navbar />
          <div className="row">
              <div className="col-md-3">
                  <Sidenav />
              </div>
              <div className="col-md-9 overflow-y-auto">                  
                  <ProjectDetails />
              </div>
          </div>
      </div>
    )
}
