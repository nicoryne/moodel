import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../middleware/AuthProvider"
import TeacherSidebar from "../../components/Teacher/TeacherSidebar"
import TeacherProfile from "./teacher-profile"
import TeacherCourses from "./teacher-courses"

export const TeacherContext = React.createContext(null)

export default function TeacherLayout() {
  const navigate = useNavigate()
  const { cookies, isAuthenticated } = useAuth()
  const [userDetails, setUserDetails] = React.useState(null)

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }

    if (cookies.user) {
      let user = cookies.user

      let userDetails = {
        fname: user.fname,
        lname: user.lname,
        birthdate: user.birthDate,
        age: user.age,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        createdAt: user.createdAt,
        courses: user.ownedCourses,
      }

      setUserDetails(userDetails)
    }
  }, [isAuthenticated, navigate, cookies])

  return (
    <TeacherContext.Provider value={userDetails}>
      <div className="flex">
        <TeacherSidebar />
        <main className="mt-16 w-full overflow-x-hidden">
          <TeacherProfile />
          <TeacherCourses />
        </main>
      </div>
    </TeacherContext.Provider>
  )
}
