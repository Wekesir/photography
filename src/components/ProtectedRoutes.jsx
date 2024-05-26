import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoutes( { children } ) {

const isAuthenticated = useSelector( (state) => state.user.isAuthenticated )

  if(isAuthenticated === false) {
    return <Navigate to="/login" />
  }

  return children
}
