async function createProject(formData, token) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
  
    const res = await fetch("http://localhost:8080/api/project/create", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: headers,
    });
  
    if (!res.ok) {
      throw new Error(`🔴 ERROR: Failed to create project. Status: ${res.status}`);
    }
  
    const data = await res.json();
    return data;
  }
  
  async function getAllProjects(token) {
    const res = await fetch("http://localhost:8080/api/project/getAll", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) {
      throw new Error(`🔴 ERROR: Request failed with status ${res.status}`);
    }
  
    const data = await res.json();
    return data;
  }
  
  async function getProjectsByCourseId(courseId, token) {
    const res = await fetch(`http://localhost:8080/api/project/getByCourseId?courseId=${courseId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) {
      throw new Error(`🔴 ERROR: Request failed with status ${res.status}`);
    }
  
    const data = await res.json();
    return data;
  }
  
  async function getProjectById(id, token) {
    const res = await fetch(`http://localhost:8080/api/project/getById?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) {
      throw new Error(`🔴 ERROR: Request failed with status ${res.status}`);
    }
  
    const data = await res.json();
    return data;
  }
  
  async function updateProject(id, formData, token) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
  
    const res = await fetch("http://localhost:8080/api/project/update", {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: headers,
    });
  
    if (!res.ok) {
      throw new Error(`🔴 ERROR: Failed to update project. Status: ${res.status}`);
    }
  
    const data = await res.json();
    return data;
  }
  
  async function deleteProject(id, token) {
    const res = await fetch(`http://localhost:8080/api/project/delete?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) {
      throw new Error(`🔴 ERROR: Failed to delete project with ID ${id}. Status: ${res.status}`);
    }
  
    const data = await res.text();
    return data;
  }
  
  async function testProjectConnection() {
    const res = await fetch("http://localhost:8080/api/project/test");
  
    if (!res.ok) {
      throw new Error(`🔴 ERROR: Connection test failed. Status: ${res.status}`);
    }
  
    const data = await res.text();
    return data;
  }
  
  export {
    createProject,
    getAllProjects,
    getProjectsByCourseId,
    getProjectById,
    updateProject,
    deleteProject,
    testProjectConnection,
  };
  