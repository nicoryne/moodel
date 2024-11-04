import React from "react";
import { Link } from "react-router-dom";

export default function TeacherDashboard() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    let storedData = localStorage.getItem("user");

    if (storedData != null) {
      setData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-blue-500 mb-4 text-center">Teacher Dashboard</h1>
        <p className="text-gray-700 mb-6 text-center">Welcome to the teacher dashboard</p>
        
        {data && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">First Name:</span>
              <span className="text-gray-800">{data.fname}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Last Name:</span>
              <span className="text-gray-800">{data.lname}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Email:</span>
              <span className="text-gray-800">{data.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Phone Number:</span>
              <span className="text-gray-800">{data.phoneNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Hire Date:</span>
              <span className="text-gray-800">{new Date(data.hireDate).toLocaleDateString('en-CA')}</span>
            </div>

            {/* Display Owned Courses */}
            {data.ownedCourses && data.ownedCourses.length > 0 && (
              <div>
                <h2 className="font-semibold text-lg text-blue-500 mt-6">Owned Courses</h2>
                <ul className="space-y-2 mt-2">
                  {data.ownedCourses.map((course, index) => (
                    <li key={index} className="bg-gray-50 p-3 rounded border border-gray-200">
                      <p className="text-gray-700 font-semibold">{course.course.title}</p>
                      <p className="text-gray-500">{course.course.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
