async function createSubmission(formData, token) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const res = await fetch("http://localhost:8080/api/submissions/create", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to create submission. Status: ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function createGroupSubmission(formData, token) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const res = await fetch("http://localhost:8080/api/submissions/createGroup", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to create group submission. Status: ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function createIndividualSubmission(formData, token) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const res = await fetch("http://localhost:8080/api/submissions/createIndividual", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to create individual submission. Status: ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function getAllSubmissions(token) {
  const res = await fetch("http://localhost:8080/api/submissions/getAll", {
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

async function getSubmissionById(id, token) {
  const res = await fetch(`http://localhost:8080/api/submissions/getById?id=${id}`, {
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

async function getSubmissionsByProjectId(projectId, token) {
  const res = await fetch(`http://localhost:8080/api/submissions/getByProjectId?projectId=${projectId}`, {
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

async function getSubmissionsByStudentId(studentId, token) {
  const res = await fetch(`http://localhost:8080/api/submissions/getByStudentId?studentId=${studentId}`, {
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

async function getIndividualSubmissionsByProjectId(projectId, studentId, token) {
  const res = await fetch(
    `http://localhost:8080/api/submissions/getByProjectIdAndStudentId?projectId=${projectId}&studentId=${studentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  )

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Request failed with status ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function updateSubmission(id, formData, token) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const res = await fetch("http://localhost:8080/api/submissions/update", {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to update submission. Status: ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function deleteSubmission(id, token) {
  const res = await fetch(`http://localhost:8080/api/submissions/delete?id=${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to delete submission with ID ${id}. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

async function testSubmissionConnection() {
  const res = await fetch("http://localhost:8080/api/submissions/test")

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Connection test failed. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

export {
  createSubmission,
  createGroupSubmission,
  createIndividualSubmission,
  getAllSubmissions,
  getSubmissionById,
  getSubmissionsByStudentId,
  getSubmissionsByProjectId,
  getIndividualSubmissionsByProjectId,
  updateSubmission,
  deleteSubmission,
  testSubmissionConnection,
}
