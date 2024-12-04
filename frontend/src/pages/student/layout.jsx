import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../middleware/AuthProvider"
import StudentSidebar from "../../components/Student/StudentSidebar"
import StudentNavbar from "../../components/Student/StudentNavbar"

export default function StudentLayout() {
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
      <StudentSidebar />
      <main className="w-full">
        <StudentNavbar />
        <Outlet context={{ userDetails }} />
      </main>
    </div>
  )
}
