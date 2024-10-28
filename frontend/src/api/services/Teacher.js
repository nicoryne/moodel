async function teacherGetByEmail(email) {
  let res = await fetch(
    `http://localhost:8080/api/teacher/getTeacherByEmail?email=${email}`
  );
  let data = await res.json();

  return data;
}

async function teacherTestConnection() {
  let res = await fetch("http://localhost:8080/api/teacher/testConnection");
  let data = await res.text();

  return data;
}

export { teacherGetByEmail, teacherTestConnection };
