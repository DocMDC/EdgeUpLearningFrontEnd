import React from 'react'
import { Outlet } from "react-router-dom"
import AdminNav from "./AdminNav"

export default function AdminLayout() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex items-center bg-blue-950 text-public-100 h-20 px-8 shadow-lg z-50 md:right-auto md:top-0 md:left-0 md:bottom-0 md:h-auto md:w-48 md:flex-col md:px-0 md:overflow-y-scroll">
          <AdminNav/>
      </div>
      <div className="mt-20 pt-6 pb-6 px-6 flex flex-col flex-grow justify-center overflow-y-auto inset-0 bg-300 md:mt-0 md:ml-48 ">
        <Outlet/>
      </div>
    </>
  )
}
