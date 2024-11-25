import React from "react"
import { useNavigate } from "react-router-dom"
import { PencilSquareIcon } from "@heroicons/react/20/solid"
import { StudentContext } from "./student-layout"

export default function StudentProfile() {
  const navigate = useNavigate()
  const userDetails = React.useContext(StudentContext)

  const handleEditProfile = () => {
    navigate("/teacher/edit")
  }

  if (!userDetails) return <div>Loading...</div>

  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="mb-8 text-center text-4xl font-bold text-blue-500">Student Profile</h1>
      <div className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">
            {userDetails.fname} {userDetails.lname}
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
            <p className="text-lg text-gray-700">{userDetails.email}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Phone</h3>
            <p className="text-lg text-gray-700">{userDetails.phoneNumber}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Age</h3>
              <p className="text-lg text-gray-700">{userDetails.age}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Hire Date</h3>
              <p className="text-lg text-gray-700">{new Date(userDetails.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Address</h3>
            <p className="text-lg text-gray-700">{userDetails.address}</p>
          </div>
        </div>

        <hr className="my-6" />

        <div>
          <h3 className="text-xl font-semibold text-gray-800">Courses Owned</h3>
          <ul className="mt-2 list-inside list-disc text-gray-700">
            {userDetails.courses && userDetails.courses.length > 0 ? (
              userDetails.courses.map((course) => (
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
