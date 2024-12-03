async function createStudentCourseEnrollment(formData, token) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const res = await fetch("http://localhost:8080/api/studentCourseEnrollment/create", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to create student course enrollment. Status: ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function getAllStudentCourseEnrollments(token) {
  const res = await fetch("http://localhost:8080/api/studentCourseEnrollment/getAll", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Request failed with status ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function getStudentCourseEnrollmentsByStudentId(studentId, token) {
  const res = await fetch(`http://localhost:8080/api/studentCourseEnrollment/getByStudentId?studentId=${studentId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Request failed with status ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function updateStudentCourseEnrollment(formData, token) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const res = await fetch("http://localhost:8080/api/studentCourseEnrollment/update", {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to update student course enrollment. Status: ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function getStudentCourseEnrollmentsByCourseId(courseId, token) {
  const res = await fetch(`http://localhost:8080/api/studentCourseEnrollment/getByCourseId?courseId=${courseId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Request failed with status ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function deleteStudentCourseEnrollment(key, token) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const res = await fetch("http://localhost:8080/api/studentCourseEnrollment/delete", {
    method: "DELETE",
    body: JSON.stringify(key),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to delete student course enrollment. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

async function testStudentCourseEnrollmentConnection() {
  const res = await fetch("http://localhost:8080/api/studentCourseEnrollment/test")

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Connection test failed. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

export {
  createStudentCourseEnrollment,
  getAllStudentCourseEnrollments,
  updateStudentCourseEnrollment,
  getStudentCourseEnrollmentsByStudentId,
  getStudentCourseEnrollmentsByCourseId,
  deleteStudentCourseEnrollment,
  testStudentCourseEnrollmentConnection,
}
