import React from 'react'
import { Link } from "react-router-dom"

export default function Unauthorized() {
  
  return (
    <div>
        <h1>Unauthorized.</h1>
        <p>You do not have permission to view this page.</p>
        <Link to='/dashboard' className="text-red-600 cursor-pointer hover:text-red-700">Return to dashboard</Link>
    </div>
  )
}
