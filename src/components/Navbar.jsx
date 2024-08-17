import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../store/UserSlice'
import logo from '../assets/logo.png';

export default function Navbar() {

    const navigate = useNavigate()
    const dispatch =  useDispatch()

    const loggedInEmail = useSelector((state) => state.user.userDetails.email) //Select the email of the logged in user 

    function handleLogOut() { 
        /**
         * This function handles the logout of the current user
         * Remove the jwt cookie stored
         * Execute the logOut action in the reducer 
         */

        Cookies.remove("authJWTToken")
        dispatch( logOut() )
        navigate("/login")      
      }

  return (
    <React.Fragment>
        <nav className="navbar navbar-expand-lg  text-white" data-bs-theme="dark" style={{ backgroundColor : 'rgba(0,0,0,.5)', color: 'white' }}>
        <div className="container-fluid">
                <Link className="navbar-brand text-white" to="/projects">
                <img src={ logo } alt="Logo" width="30" height="24" className="d-inline-block align-text-top me-2" />
                LYRICS STUDIOS
              </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <span className="navbar-text">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link dropdown-toggle text-white" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        { loggedInEmail }
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end  text-white">
                            <li><Link className="dropdown-item text-white" to="/updateprofile"><i className="bi bi-person"></i> Update Profile</Link></li>
                            <li><Link className="dropdown-item text-white" to="#"><i className="bi bi-key"></i> Update Password</Link></li>
                            <li onClick={ handleLogOut }><Link className="dropdown-item text-white" to="#"><i className="bi bi-box-arrow-left"></i> Sign Out</Link></li>
                        </ul>
                    </li>
                </ul>               
            </span>
        </div>
        </nav>
    </React.Fragment>
  )
}
