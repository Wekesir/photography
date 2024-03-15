import React from 'react'
import ProjectDetails from '../components/ProjectDetails'
import Sidenav from '../components/Sidenav'
import Navbar from '../components/Navbar'

export default function ProjectDetailsPage() {

    document.title = "Project Details | Lyrics Photography"

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
