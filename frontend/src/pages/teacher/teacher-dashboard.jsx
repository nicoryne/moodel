import React from "react"
import { Link } from "react-router-dom"

export default function TeacherDashboard() {
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    let storedData = localStorage.getItem("user")

    if (storedData != null) {
      setData(JSON.parse(storedData))
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold text-blue-500">
          Teacher Dashboard
        </h1>
        <p className="mb-6 text-center text-gray-700">
          Welcome to the teacher dashboard
        </p>

        {data && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-600">First Name:</span>
              <span className="text-gray-800">{data.fname}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-600">Last Name:</span>
              <span className="text-gray-800">{data.lname}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-600">Email:</span>
              <span className="text-gray-800">{data.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-600">Phone Number:</span>
              <span className="text-gray-800">{data.phoneNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-600">Hire Date:</span>
              <span className="text-gray-800">
                {new Date(data.hireDate).toLocaleDateString("en-CA")}
              </span>
            </div>

            {/* Display Owned Courses */}
            {data.ownedCourses && data.ownedCourses.length > 0 && (
              <div>
                <h2 className="mt-6 text-lg font-semibold text-blue-500">
                  Owned Courses
                </h2>
                <ul className="mt-2 space-y-2">
                  {data.ownedCourses.map((course, index) => (
                    <li
                      key={index}
                      className="rounded border border-gray-200 bg-gray-50 p-3"
                    >
                      <p className="font-semibold text-gray-700">
                        {course.course.title}
                      </p>
                      <p className="text-gray-500">
                        {course.course.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
