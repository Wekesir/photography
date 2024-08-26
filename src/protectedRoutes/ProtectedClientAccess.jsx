import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedClientAccess() {
    const { clientEmail } = useSelector((state)=> state.client)

    return clientEmail ? <Outlet /> : <Navigate to="/" replace />  
}
