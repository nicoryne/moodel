import React from 'react';

const StudentCoursesClient = ({ courses }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course.id} className="p-4 border rounded shadow-sm bg-white">
            <h3 className="text-lg font-bold">{course.title}</h3>
            <p className="text-sm">{course.description}</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCoursesClient;
