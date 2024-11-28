import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../middleware/AuthProvider"
import { studentGetByEmail } from "../../services"
import { PencilSquareIcon } from "@heroicons/react/20/solid"

export default function StudentProfilePage() {
  const navigate = useNavigate()
  const [studentDetails, setStudentDetails] = useState(null)
  const { user, token, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }

    if (user) {
      console
      setStudentDetails(user)
    }
  }, [isAuthenticated, navigate, user, token])

  const handleEditProfile = () => {
    // Navigate to the edit profile page
    navigate("/student/edit")
  }

  if (!studentDetails) return <div>Loading...</div>

  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="mb-8 text-center text-4xl font-bold text-blue-500">Student Profile</h1>
      <div className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">
            {studentDetails.fname} {studentDetails.lname}
          </h2>
          <button onClick={handleEditProfile} className="flex items-center text-blue-500 hover:text-blue-700">
            <PencilSquareIcon className="mr-1 h-5 w-5" />
            Edit Profile
          </button>
        </div>
        <hr className="my-4" />

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="text-lg text-gray-700">{studentDetails.email}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Phone</h3>
            <p className="text-lg text-gray-700">{studentDetails.phoneNumber}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Age</h3>
              <p className="text-lg text-gray-700">{studentDetails.age}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Hire Date</h3>
              <p className="text-lg text-gray-700">{new Date(studentDetails.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Address</h3>
            <p className="text-lg text-gray-700">{studentDetails.address}</p>
          </div>
        </div>

        <hr className="my-6" />

        <div>
          <h3 className="text-xl font-semibold text-gray-800">Courses Owned</h3>
          <ul className="mt-2 list-inside list-disc text-gray-700">
            {studentDetails.courses && studentDetails.courses.length > 0 ? (
              studentDetails.courses.map((course) => (
                <li key={course.courseId} className="text-base">
                  {course.title}
                </li>
              ))
            ) : (
              <li className="text-base">No courses assigned.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
