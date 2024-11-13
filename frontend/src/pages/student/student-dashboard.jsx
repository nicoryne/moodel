import React, { useEffect, useState } from 'react';
import StudentCoursesClient from '../../components/Student/StudentCoursesClient';
import StudentLayout from '../../components/Student/StudentLayout';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from an API or mock data
    const fetchCourses = async () => {
      const response = await fetch('/api/student/courses'); // Replace with actual API
      const data = await response.json();
      setCourses(data);
    };

    fetchCourses();
  }, []);

  return (
    <StudentLayout>
      <StudentCoursesClient courses={courses} />
    </StudentLayout>
  );
};

export default StudentDashboard;
