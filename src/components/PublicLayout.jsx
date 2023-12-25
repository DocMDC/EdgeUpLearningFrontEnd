import React from 'react'
import { Outlet } from "react-router-dom"
import PublicNav from "./PublicNav"

export default function PublicLayout() {
  return (
    <>
      <div className="layout z-[100]">
          <PublicNav/>
      </div>
      <div className="mt-20">
        <Outlet/>
      </div>
    </>

  )
}
