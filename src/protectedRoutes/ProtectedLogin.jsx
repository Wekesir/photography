import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoutes(  ) {

  const { isAuthenticated, userDetails } = useSelector( (state) => state.user )

  return isAuthenticated && userDetails.length > 0 ? <Outlet/> : <Navigate to="/login" replace/> 

}
