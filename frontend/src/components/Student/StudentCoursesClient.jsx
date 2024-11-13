import React from 'react';

const StudentCoursesClient = ({ courses }) => {
  return (
    <div className="p-4 border rounded shadow-sm bg-white max-w-md">
      <h2 className="text-xl font-semibold mb-2">Your Courses</h2>
      {courses.length === 0 ? (
        <p className="text-sm text-gray-500">You are not enrolled in any courses currently.</p>
      ) : (
        <div className="space-y-2">
          {courses.map(course => (
            <div key={course.id} className="p-2 border-b last:border-b-0">
              <h3 className="text-md font-bold">{course.title}</h3>
              <p className="text-xs">{course.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentCoursesClient;
