import React from 'react'
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectDarkModeEnabled } from '../redux/slices/darkModeSlice'

export default function ExamInSessionLayout() {
  const darkModeEnabled = useSelector(selectDarkModeEnabled)

  return (
    <div className={darkModeEnabled ? "w-full h-screen fixed bg-black" : "w-full h-screen fixed bg-gradient-to-tr from-exam-mainBG via-transparent to-exam-secondaryBG"}>
        <Outlet/>
    </div>
  )
}
