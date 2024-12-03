import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../middleware/AuthProvider"
import StudentSidebar from "../../components/Student/StudentSidebar"
import StudentNavbar from "../../components/Student/StudentNavbar"

export const StudentContext = React.createContext(null)

export default function StudentLayout() {
  const navigate = useNavigate()
  const { cookies, isAuthenticated } = useAuth()
  const [userDetails, setUserDetails] = React.useState(null)

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }

    if (cookies.user) {
      let user = cookies.user

      let sortedCourses = user.courseEnrollments.sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return dateB - dateA
      })

      let userDetails = {
        fname: user.fname,
        lname: user.lname,
        birthdate: user.birthDate,
        age: user.age,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        createdAt: user.createdAt,
        courses: sortedCourses,
      }

      setUserDetails(userDetails)
    }
  }, [isAuthenticated, navigate, cookies])

  return (
    <StudentContext.Provider value={userDetails}>
      <div className="flex">
        <StudentSidebar />
        <main className="w-full">
          <StudentNavbar />
          {userDetails && (
            <>
              <Outlet />
            </>
          )}
        </main>
      </div>
    </StudentContext.Provider>
  )
}
