import React from 'react'
import Login from '../components/Login'

export default function LoginPage() {

  document.title = "Login | Lyrics Studios";

  return (
    <div className="container-fluid bg-dark d-flex align-items-center" style={{ height: '100vh' }}>
         <Login />
    </div>   
  )
}
