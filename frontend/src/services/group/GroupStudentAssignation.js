async function createGroupStudentAssignation(formData, token) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const res = await fetch("http://localhost:8080/api/groupStudentAssignation/create", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to create group student assignation. Status: ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function getAllGroupStudentAssignations(token) {
  const res = await fetch("http://localhost:8080/api/groupStudentAssignation/getAll", {
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

async function getGroupStudentAssignationsByGroupId(groupId, token) {
  const res = await fetch(`http://localhost:8080/api/groupStudentAssignation/getByGroup?groupId=${groupId}`, {
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

async function getGroupStudentAssignationsByStudentId(studentId, token) {
  const res = await fetch(`http://localhost:8080/api/groupStudentAssignation/getByStudent?studentId=${studentId}`, {
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

async function deleteGroupStudentAssignation(groupId, studentId, token) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const res = await fetch(
    `http://localhost:8080/api/groupStudentAssignation/delete?groupId=${groupId}&studentId=${studentId}`,
    {
      method: "DELETE",
      headers: headers,
    },
  )

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to delete group student assignation. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

async function testGroupStudentAssignationConnection() {
  const res = await fetch("http://localhost:8080/api/groupStudentAssignation/test")

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Connection test failed. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

export {
  createGroupStudentAssignation,
  getAllGroupStudentAssignations,
  getGroupStudentAssignationsByGroupId,
  getGroupStudentAssignationsByStudentId,
  deleteGroupStudentAssignation,
  testGroupStudentAssignationConnection,
}
