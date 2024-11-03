async function teacherGetByEmail(email) {
  let res = await fetch(
    `http://localhost:8080/api/teacher/getTeacherByEmail?email=${email}`
  );

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Request failed with status ${res.status}`);
  }

  let data = await res.json();

  if (!data || Object.keys(data).length === 0) {
    throw new Error(`🔴 ERROR: No data found for email ${email}`);
  }

  return data;
}

async function teacherDeleteById(id) {
  const res = await fetch(
    `http://localhost:8080/api/teacher/deleteTeacherDetails/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error(
      `🔴 ERROR: Failed to delete teacher with ID ${id}. Status: ${res.status}`
    );
  }

  const data = await res.text();
  return data;
}

async function createTeacher(formData) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const res = await fetch(
    `http://localhost:8080/api/teacher/postTeacherRecord`,
    {
      method: "POST",
      body: JSON.stringify(formData),
      headers: headers,
    }
  );

  if (!res.ok) {
    throw new Error(
      `🔴 ERROR: Failed to create teacher record. Status: ${res.status}`
    );
  }

  const data = await res.text();
  return data;
}

async function teacherTestConnection() {
  const res = await fetch("http://localhost:8080/api/teacher/testConnection");

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Connection test failed. Status: ${res.status}`);
  }

  const data = await res.text();
  return data;
}

export {
  teacherGetByEmail,
  teacherDeleteById,
  createTeacher,
  teacherTestConnection,
};
