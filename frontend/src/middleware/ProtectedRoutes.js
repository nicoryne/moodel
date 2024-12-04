import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"

export default function PrivateRoutes({ allowedRoles }) {
  const { isAuthenticated, cookies } = useAuth()
  const [isLoading, setIsLoading] = React.useState(true)
  const [userRole, setUserRole] = React.useState(null)

  React.useEffect(() => {
    if (cookies.user) {
      const user = cookies.user
      setUserRole(user?.role)
      setIsLoading(false)
    } else if (!isAuthenticated) {
      setIsLoading(false)
    }
  }, [cookies.user, isAuthenticated])

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />
  }

  return <Outlet />
}
