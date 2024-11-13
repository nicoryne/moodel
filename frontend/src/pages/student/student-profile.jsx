import React, { useEffect, useState } from 'react';

const StudentProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await fetch('/api/student/getByEmail', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`🔴 ERROR: Request failed with status ${response.status}`);
          }

          const data = await response.json();
          setProfile(data);
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error('🔴 ERROR: No authentication token found.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading profile...</div>;
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
