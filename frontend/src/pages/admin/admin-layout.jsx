import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../middleware/AuthProvider"
import AdminSidebar from "../../components/Admin/AdminSidebar"

export default function AdminLayout() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="flex">
      <AdminSidebar />

      <main className="mt-16 w-full overflow-x-hidden p-8">
        <Outlet />
      </main>
    </div>
  )
}
