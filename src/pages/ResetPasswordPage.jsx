import React, { useContext } from 'react'
import ResetPassword from '../components/ResetPassword'
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordPage() {
    document.title = 'Reset Password | Photography';

    const { loggedInUserData, setLoggedInUserData } = useContext(UserContext)

    const navigate =useNavigate()

    if( !isLoggedIn(loggedInUserData) ) {
      navigate("/login")
      return null //Prevents the rendering of the rest of the component
    } 
    
  return (
    <div className="container-fluid d-flex align-items-center bg-dark" style={{ height: '100vh' }}>
        <ResetPassword />
    </div>
  )
}
