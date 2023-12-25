import React from 'react'
import { Link } from "react-router-dom"

export default function Missing() {
  return (
    <div className="flex flex-col p-4 items-center justify-center">
      <div className="text-4xl">Oops! Page not found.</div>
      <Link to="/" className="text-front-500 cursor-pointer hover:text-front-600 mt-10">
          <h1>Return to home page</h1>
      </Link>
    </div>
  )
}
