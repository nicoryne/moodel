import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../middleware/AuthProvider"
import StudentSidebar from "../../components/Student/StudentSidebar"

export default function StudentLayout() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  console.log(isAuthenticated)

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="flex">
      <StudentSidebar />

      <main className="mt-16 w-full overflow-x-hidden p-8">
        <Outlet />
      </main>
    </div>
  )
}
