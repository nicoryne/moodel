export default async function teacherTestConnection() {
  let res = await fetch("http://localhost:8080/api/teacher/testConnection");

  return data;
}
