import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../middleware/AuthProvider"
import TeacherClient from "../../components/Teacher/TeacherClient"

export default function TeacherDashboard() {
  const navigate = useNavigate()
  const [teacherDetails, setTeacherDetails] = React.useState()
  const { user, isAuthenticated } = useAuth()

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }

    if (user) {
      let teacherDetails = {
        fname: user.fname,
        lname: user.lname,
        birthdate: user.birthdate,
        age: user.age,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        hireDate: user.hireDate,
        courses: user.courses,
      }

      setTeacherDetails(teacherDetails)
    }
  }, [isAuthenticated, navigate, user])

  return <TeacherClient teacherDetails={teacherDetails} />
}
