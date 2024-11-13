import React, { useEffect, useState } from 'react';

const StudentProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/student/getByEmail')
      .then(response => response.json())
      .then(data => {
        console.log('Profile data:', data); // Check if data is being fetched correctly
        setProfile(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        setLoading(false);
      });
  }, []);
  

  if (loading) {
    return <div>Loading profile...</div>;
  }
  
  if (!profile || Object.keys(profile).length === 0) {
    return <div>No profile data available.</div>;
  }
  

  return (
    <div className="p-4 border rounded shadow-sm bg-white max-w-md">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      <div className="space-y-2">
        <div>
          <span className="font-bold">First Name:</span> {profile.fname}
        </div>
        <div>
          <span className="font-bold">Last Name:</span> {profile.lname}
        </div>
        <div>
          <span className="font-bold">Email:</span> {profile.email}
        </div>
        <div>
          <span className="font-bold">Birth Date:</span> {profile.birthDate}
        </div>
        <div>
          <span className="font-bold">Phone Number:</span> {profile.phoneNumber}
        </div>
        <div>
          <span className="font-bold">Address:</span> {profile.address}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
