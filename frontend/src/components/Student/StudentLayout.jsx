import React from 'react';
import StudentSidebar from './StudentSidebar';

const StudentLayout = ({ children }) => {
  return (
    <div className="flex">
      <StudentSidebar />
      <main className="flex-1 ml-20 md:ml-64 p-6">
        {children}
      </main>
    </div>
  );
};

export default StudentLayout;
