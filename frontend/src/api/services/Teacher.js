async function teacherGetByEmail(email) {
  let res = await fetch(
    `http://localhost:8080/api/teacher/getTeacherByEmail?email=${email}`
  );
  let data = await res.json();

  return data;
}

async function teacherDeleteById(id) {
  let res = await fetch(
    `http://localhost:8080/api/teacher/deleteTeacherDetails/${id}`
  );
  let data = await res.text();

  return data;
}

async function createTeacher(formData) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  let res = await fetch(`http://localhost:8080/api/teacher/postTeacherRecord`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: headers,
  });
  let data = await res.text();

  return data;
}

async function teacherTestConnection() {
  let res = await fetch("http://localhost:8080/api/teacher/testConnection");
  let data = await res.text();

  return data;
}

export {
  teacherGetByEmail,
  teacherDeleteById,
  createTeacher,
  teacherTestConnection,
};
