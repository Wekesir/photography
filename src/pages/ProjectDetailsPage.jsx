import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectDetails from '../components/ProjectDetails'
import Sidenav from '../components/Sidenav'
import Navbar from '../components/Navbar'
import { isLoggedIn } from '../utils/helpers'
import UserContext from '../contexts/UserContext'

export default function ProjectDetailsPage() {

    document.title = "Project Details | Lyrics Photography"

    const navigate = useNavigate()

    const { loggedInUserData, setLoggedInUserData } = useContext(UserContext)

    if( !isLoggedIn(loggedInUserData) ) {
      navigate("/login")
      return null //Prevents the rendering of the rest of the component
    } 

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
