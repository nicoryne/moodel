async function createGroup(formData, token) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const res = await fetch("http://localhost:8080/api/groups/create", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to create group. Status: ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function getAllGroups(token) {
  const res = await fetch("http://localhost:8080/api/groups/getAll", {
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

async function getGroupById(id, token) {
  const res = await fetch(`http://localhost:8080/api/groups/getById?id=${id}`, {
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

async function updateGroup(id, formData, token) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const res = await fetch("http://localhost:8080/api/groups/update", {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to update group. Status: ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function deleteGroup(id, token) {
  const res = await fetch(`http://localhost:8080/api/groups/delete?id=${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to delete group with ID ${id}. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

async function testGroupConnection() {
  const res = await fetch("http://localhost:8080/api/groups/test")

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Connection test failed. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

export { createGroup, getAllGroups, getGroupById, updateGroup, deleteGroup, testGroupConnection }
