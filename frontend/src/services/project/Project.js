async function createProject(formData, token) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const res = await fetch("http://localhost:8080/api/projects/create", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to create project. Status: ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function getAllProjects(token) {
  const res = await fetch("http://localhost:8080/api/projects/getAll", {
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

async function getProjectsByCourseId(courseId, token) {
  const res = await fetch(`http://localhost:8080/api/projects/getByCourseId?courseId=${courseId}`, {
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

async function getProjectById(id, token) {
  const res = await fetch(`http://localhost:8080/api/projects/getById?id=${id}`, {
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

async function updateProject(formData, token) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const res = await fetch("http://localhost:8080/api/projects/update", {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to update project. Status: ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function deleteProject(id, token) {
  const res = await fetch(`http://localhost:8080/api/projects/delete?id=${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to delete project with ID ${id}. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

async function testProjectConnection() {
  const res = await fetch("http://localhost:8080/api/projects/test")

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Connection test failed. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

export {
  createProject,
  getAllProjects,
  getProjectsByCourseId,
  getProjectById,
  updateProject,
  deleteProject,
  testProjectConnection,
}
