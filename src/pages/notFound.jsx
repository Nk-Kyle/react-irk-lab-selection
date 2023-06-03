import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-4">404 - Page Not Found</h1>
        <p className="lead">The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary">
          Go back to home
        </Link>
      </div>
    </div>
  )
}
