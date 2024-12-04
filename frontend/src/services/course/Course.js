async function createCourse(formData, token) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const res = await fetch("http://localhost:8080/api/course/create", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to create course. Status: ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function getAllCourses(token) {
  const res = await fetch("http://localhost:8080/api/course/getAll", {
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

async function getCourseById(id, token) {
  const res = await fetch(`http://localhost:8080/api/course/getById?id=${id}`, {
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

async function getCourseByTitle(title, token) {
  const res = await fetch(`http://localhost:8080/api/course/getByTitle?title=${title}`, {
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

async function updateCourse(formData, token) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const res = await fetch("http://localhost:8080/api/course/update", {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to update course. Status: ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function deleteCourse(id, token) {
  const res = await fetch(`http://localhost:8080/api/course/delete?id=${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to delete course with ID ${id}. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

async function testCourseConnection() {
  const res = await fetch("http://localhost:8080/api/course/test")

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Connection test failed. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

export {
  createCourse,
  getAllCourses,
  getCourseById,
  getCourseByTitle,
  updateCourse,
  deleteCourse,
  testCourseConnection,
}
