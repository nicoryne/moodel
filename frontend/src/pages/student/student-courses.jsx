import React from 'react';


const StudentCourses = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">My Courses</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards for enrolled courses */}
        {[1, 2, 3].map((course) => (
          <div
            key={course}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-medium">Course Title {course}</h2>
              <p className="text-gray-500 mt-2">Course Description {course}</p>
            </div>
            <button className="mt-4 py-2 px-4 text-sm font-semibold text-blue-500 border border-blue-500 rounded hover:bg-blue-50">
              View Details
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="py-2 px-6 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
          Find New Courses
        </button>
      </div>
    </div>
  );
};

export default StudentCourses;
