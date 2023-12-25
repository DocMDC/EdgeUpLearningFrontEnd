import React from 'react'

export default function AdminDashboard() {
  return (
    <div className="bg-300 w-full pb-4">
      <div className="bg-100 h-12 flex items-center justify-center text-xl tracking-wider text-500">
        <h1>Home</h1>
      </div>
      <div className="bg-100 mt-4 min-h-[1000px]">
        <h1 className="p-2">Welcome to the Admin Dashboard. Here you can add, edit, and delete questions for all of the users.</h1>
      </div>
    </div>
  )
}