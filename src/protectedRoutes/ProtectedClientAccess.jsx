import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedClientAccess() {
    const {folder} = useSelector((state)=> {state.client})

    folder ? <Outlet /> : <Navigate to="/" /> 
}
