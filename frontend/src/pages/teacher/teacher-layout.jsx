import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../middleware/AuthProvider"
import TeacherSidebar from "../../components/Teacher/TeacherSidebar"

export default function TeacherLayout() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="flex">
      <TeacherSidebar />

      <main className="mt-16 w-full overflow-x-hidden p-8">
        <Outlet />
      </main>
    </div>
  )
}
