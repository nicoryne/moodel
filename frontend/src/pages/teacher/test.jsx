// test.jsx
import React, { useEffect, useState } from "react";
import teacherTestConnection from "../../api/teacher"; // Adjust the import path as necessary

export default function Test() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await teacherTestConnection();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once when the component mounts

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Test Connection Result:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display fetched data */}
    </div>
  );
}
