import React from 'react'

export default function Loading() {
  return (
    <div className="text-center align-middle">
        <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <span role="status" className="ms-3 fw-bold text-secondary">Loading...</span>
    </div>
  )
}
