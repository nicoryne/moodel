async function createTeacherCourseOwnership(formData, token) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const res = await fetch("http://localhost:8080/api/teacherCourseOwnership/create", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to create teacher course ownership. Status: ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function tcoGetAll(token) {
  const res = await fetch("http://localhost:8080/api/teacherCourseOwnership/getAll", {
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

async function tcoGetByTeacherId(teacherId, token) {
  const res = await fetch(`http://localhost:8080/api/teacherCourseOwnership/getByTeacherId?teacherId=${teacherId}`, {
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

async function tcoGetByCourseId(courseId, token) {
  const res = await fetch(`http://localhost:8080/api/teacherCourseOwnership/getByCourseId?courseId=${courseId}`, {
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

async function updateTeacherCourseOwnership(formData, token) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const res = await fetch("http://localhost:8080/api/teacherCourseOwnership/update", {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to update teacher course ownership. Status: ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function deleteTeacherCourseOwnership(key, token) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const res = await fetch("http://localhost:8080/api/teacherCourseOwnership/delete", {
    method: "DELETE",
    body: JSON.stringify(key),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to delete teacher course ownership. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

async function testTeacherCourseOwnershipConnection() {
  const res = await fetch("http://localhost:8080/api/teacherCourseOwnership/test")

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Connection test failed. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

export {
  createTeacherCourseOwnership,
  tcoGetAll,
  tcoGetByTeacherId,
  tcoGetByCourseId,
  updateTeacherCourseOwnership,
  deleteTeacherCourseOwnership,
  testTeacherCourseOwnershipConnection,
}
