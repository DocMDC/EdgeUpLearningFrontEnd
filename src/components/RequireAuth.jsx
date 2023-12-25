import React from 'react'
import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken, selectCurrentRoles } from "../redux/slices/authSlice"

export default function RequireAuth({ allowedRoles }) {

    const token = useSelector(selectCurrentToken)
    const roles = useSelector(selectCurrentRoles)
    const location = useLocation()
    
    // const hasAccess = roles?.find(role => allowedRoles.includes(role))

    const hasAccess = roles?.some((role) => allowedRoles.includes(role))

    if (!token && !hasAccess) {
      return <Navigate to="/login" state={{ from: location }} replace/>
    }

    if (token && !hasAccess) {
      return <Navigate to="/dashboard/unauthorized" state={{ from: location }} replace/>
    }

    return <Outlet />
}
