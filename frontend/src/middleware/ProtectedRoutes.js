import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"

export default function PrivateRoutes({ allowedRoles }) {
  const { isAuthenticated, cookies } = useAuth()
  const userRole = cookies.role

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />
  }

  return <Outlet />
}
