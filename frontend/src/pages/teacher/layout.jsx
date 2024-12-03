import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../middleware/AuthProvider"
import TeacherSidebar from "../../components/Teacher/TeacherSidebar"
import TeacherProfile from "./profile"
import TeacherNavBar from "../../components/Teacher/TeacherNavbar"

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
        birthdate: new Date(user.birthDate).toLocaleDateString("en-CA"),
        age: user.age,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        createdAt: new Date(user.createdAt).toLocaleDateString("en-CA"),
        courses: user.ownedCourses,
      }

      setUserDetails(userDetails)
    }
  }, [isAuthenticated, navigate, cookies])

  return (
    <TeacherContext.Provider value={userDetails}>
      <div className="flex">
        <TeacherSidebar />
        <main className="w-full">
          <TeacherNavBar />
          {userDetails && (
            <>
              <Outlet />
            </>
          )}
        </main>
      </div>
    </TeacherContext.Provider>
  )
}
