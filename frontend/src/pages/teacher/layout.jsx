import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../middleware/AuthProvider"
import TeacherSidebar from "../../components/Teacher/TeacherSidebar"
import TeacherNavBar from "../../components/Teacher/TeacherNavbar"

export default function TeacherLayout() {
  const navigate = useNavigate()
  const { cookies, isAuthenticated } = useAuth()
  const [userDetails, setUserDetails] = React.useState(null)

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    } else if (cookies.user) {
      try {
        const user = cookies.user
        setUserDetails(user)
      } catch (error) {
        console.error("🔴 ERROR parsing user cookie:", error)
        navigate("/login")
      }
    }
  }, [isAuthenticated, cookies, navigate])

  if (!isAuthenticated || !userDetails) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex">
      <TeacherSidebar />
      <main className="w-full">
        <TeacherNavBar context={{ userDetails }} />
        <Outlet context={{ userDetails }} />
      </main>
    </div>
  )
}
