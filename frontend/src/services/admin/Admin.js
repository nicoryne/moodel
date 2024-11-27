async function adminLogin(formData) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  const res = await fetch("http://localhost:8080/api/admin/login", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error("🔴 Login Failed: Invalid credentials")
  }

  const token = await res.text()
  return token
}

async function adminRegister(formData) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  const res = await fetch("http://localhost:8080/api/admin/register", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to register. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

async function adminGetByEmail(email, token) {
  const res = await fetch(`http://localhost:8080/api/admin/getByEmail?email=${email}`, {
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

  if (!data || Object.keys(data).length === 0) {
    throw new Error(`🔴 ERROR: No data found for email ${email}`)
  }

  return data
}

async function adminGetById(id, token) {
  const res = await fetch(`http://localhost:8080/api/admin/getById?id=${id}`, {
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

  if (!data || Object.keys(data).length === 0) {
    throw new Error(`🔴 ERROR: No data found for ID ${id}`)
  }

  return data
}

async function adminGetByLname(lname, token) {
  const res = await fetch(`http://localhost:8080/api/admin/getByLname?lname=${lname}`, {
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

  if (!data || Object.keys(data).length === 0) {
    throw new Error(`🔴 ERROR: No data found for last name ${lname}`)
  }

  return data
}

async function adminDeleteById(id) {
  const res = await fetch(`http://localhost:8080/api/admin/delete?id=${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to delete admin with ID ${id}. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

async function adminTestConnection() {
  const res = await fetch("http://localhost:8080/api/admin/test")

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Connection test failed. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

export {
  adminLogin,
  adminRegister,
  adminGetByEmail,
  adminGetById,
  adminGetByLname,
  adminDeleteById,
  adminTestConnection,
}
