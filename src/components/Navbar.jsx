import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

export default function Navbar() {
    const { loggedInUserData, setLoggedInUserData } = useContext(UserContext)

    const navigate = useNavigate()

    //Sign out 
    function handleSignOut(event) {
        /**
         * For the sign out, basically set the loggedInuserData to an empty object 
         */
        event.preventDefault()
        setLoggedInUserData({})
        navigate("/")
    }

  return (
    <>
        <nav className="navbar navbar-expand-lg bg-dark text-white" data-bs-theme="dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/home">LYRICS STUDIOS.</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <span className="navbar-text">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Welcome, { loggedInUserData.name }
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><Link className="dropdown-item" to="#"><i className="bi bi-person"></i> Update Profile</Link></li>
                            <li><Link className="dropdown-item" to="#"><i className="bi bi-key"></i> Update Password</Link></li>
                            <li onClick={ handleSignOut }><Link className="dropdown-item" to="#"><i className="bi bi-box-arrow-left"></i> Sign Out</Link></li>
                        </ul>
                    </li>
                </ul>               
            </span>
        </div>
        </nav>
    </>
  )
}
