// test.jsx
import React, { useEffect, useState } from "react";
import { teacherGetByEmail } from "../../api/services/Teacher";

export default function Test() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await teacherGetByEmail("email");
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Test Connection Result:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
