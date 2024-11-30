import React from "react";

const ProjectCard = ({ project, onSubmissionClick }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold">{project.title}</h3>
      <p className="mt-2 text-gray-600">{project.description}</p>
      <p className="mt-2">
        <strong>Due date:</strong> {new Date(project.submissionDeadline).toLocaleString()}
      </p>
      <p className="mt-2">
        <strong>Status:</strong> {project.isActive ? "Active" : "Inactive"}
      </p>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={onSubmissionClick}
      >
        Add Submission
      </button>
    </div>
  );
};

export default ProjectCard;
