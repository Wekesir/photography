import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Projects from '../components/Projects'
import Navbar from '../components/Navbar'
import Sidenav from '../components/Sidenav' 
import { isLoggedIn } from '../utils/helpers'
import  UserContext from '../contexts/UserContext'

export default function ProjectsPage() {

  const navigate = useNavigate()

  const { loggedInUserData, setLoggedInUserData } = useContext(UserContext)

  if( !isLoggedIn(loggedInUserData) ) {
    navigate("/login")
    return null //Prevents the rendering of the rest of the component
  } 

document.title = "Projects | Lyrics Photography"

  return (
    <div className='bg-dark container-fluid ps-0' style={{height: '100vh'}}>
        <Navbar />
        <div className="row">
            <div className="col-md-3">
                <Sidenav />
            </div>
            <div className="col-md-9 overflow-y-auto">
                <h5 className="text-white"><i className="bi bi-folder-plus"></i> &nbsp; Projects List</h5>
                <Projects />
            </div>
        </div>
    </div>
  )
}
