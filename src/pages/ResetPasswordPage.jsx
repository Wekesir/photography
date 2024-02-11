import React from 'react'
import ResetPassword from '../components/ResetPassword'

export default function ResetPasswordPage() {
    document.title = 'Reset Password | Photography';
    
  return (
    <div className="container-fluid d-flex align-items-center bg-dark" style={{ height: '100vh' }}>
        <ResetPassword />
    </div>
  )
}
