import React from 'react';

const StudentSubmissions = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">My Submissions</h1>

      <div className="space-y-4">
        {/* Placeholder cards for existing submissions */}
        {[1, 2, 3].map((submission) => (
          <div key={submission} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-medium">Submission Title {submission}</h2>
            <p className="text-gray-500 mt-1">Submission Date: 2024-11-14</p>
            <p className="text-gray-500">Status: Graded / Pending</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="py-2 px-6 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
          New Submission
        </button>
      </div>
    </div>
  );
};

export default StudentSubmissions;
