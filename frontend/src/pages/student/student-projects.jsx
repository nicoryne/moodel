import { getCourseById } from "../../services/course/Course";
import { getProjectsByCourseId } from "../../services/project/Project";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { StudentContext } from "./student-layout"

const StudentProjects = () => {
  const { courseId } = useParams();
  const [projects, setProjects] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const userDetails = React.useContext(StudentContext)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await getCourseById(courseId);
        setCourseDetails(courseData);

        const projectsData = await getProjectsByCourseId(courseId);
        setProjects(projectsData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-500 text-white p-6">
        <h1 className="text-3xl font-bold">{courseDetails.title}</h1>
        <p className="mt-2">{courseDetails.description}</p>
      </header>

      <main className="flex-grow p-8 bg-gray-100">
        <h2 className="text-2xl font-bold text-blue-700">Projects</h2>
        {projects.length === 0 ? (
          <p className="mt-4 text-gray-600">No projects available for this course.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {projects.map((project) => (
              <div key={project.projectId} className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="mt-2 text-gray-600">{project.description}</p>
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => alert(`Submission for: ${project.title}`)}
                >
                  Add Submission
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentProjects;
