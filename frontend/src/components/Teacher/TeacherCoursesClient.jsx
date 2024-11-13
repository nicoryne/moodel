import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../middleware/AuthProvider"
import { MotionComponent } from "../MotionComponent"

export default function TeacherCoursesClient() {
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
        birthdate: user.birthDate,
        age: user.age,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        hireDate: user.hireDate,
        courses: user.ownedCourses,
      }

      setTeacherDetails(teacherDetails)
<<<<<<< HEAD
    }
  }, [isAuthenticated, navigate, user, teacherDetails])

=======
    } console.log(teacherDetails)
  }, [isAuthenticated, navigate, user, teacherDetails])
      
>>>>>>> 7978c03d5cec6bf2306c06dc693194ec28cf471f
  return (
    <>
      <h1 className="mb-8 text-center text-4xl font-bold text-blue-400">My Courses</h1>

      {/* Displaying Courses */}
      {teacherDetails && teacherDetails.courses && teacherDetails.courses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teacherDetails.courses.map((courseData, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Course Title */}
              <h2 className="text-xl font-semibold text-blue-400">{courseData.course.title || "Untitled Course"}</h2>

              {/* Course Description */}
              <p className="mt-2 text-gray-600">{courseData.course.description || "No description available"}</p>

              {/* Ownership Date */}
              <p className="mt-4 text-sm text-gray-500">
                Ownership Date: {new Date(courseData.ownershipDate).toLocaleDateString()}
              </p>

              {/* Button for course details */}
              <MotionComponent
                as="button"
                className="mt-4 rounded-lg bg-blue-400 px-4 py-2 text-white hover:bg-blue-500 focus:outline-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </MotionComponent>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-center text-gray-600">No courses found.</p>
      )}
    </>
  )
}
