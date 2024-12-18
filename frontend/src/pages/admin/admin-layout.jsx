import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../middleware/AuthProvider"
import AdminSidebar from "../../components/Admin/AdminSidebar"

export const AdminContext = React.createContext(null)

export default function AdminLayout() {
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
    <AdminContext.Provider value={userDetails}>
      <div className="flex">
        <AdminSidebar />
        <main className="mt-16 w-full overflow-x-hidden p-8">
          <Outlet />
        </main>
      </div>
    </AdminContext.Provider>
  )
}
