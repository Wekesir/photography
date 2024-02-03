import React from 'react'
import SignUp from '../components/SignUp'

export default function SignupPage() {

  document.title = "Sign up | Photography."

  return (
    <div className="container-fluid bg-dark d-flex align-items-center" style={{ height: '100vh' }}>
         <SignUp />
    </div> 
  )
}
