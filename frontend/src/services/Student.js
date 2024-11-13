async function studentLogin(formData) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
  
    const res = await fetch(`http://localhost:8080/api/student/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: headers,
    });
  
    if (!res.ok) {
      throw new Error(`🔴 Login Failed: Invalid credentials`);
    }
  
    const token = await res.text();
    return token;
  }
  
  async function studentRegister(formData) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
  
    const res = await fetch(`http://localhost:8080/api/student/register`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: headers,
    });
  
    if (!res.ok) {
      throw new Error(`🔴 ERROR: Failed to register. Status: ${res.status}`);
    }
  
    const data = await res.text();
    return data;
  }
  
  export async function fetchStudentProfile() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('🔴 ERROR: No authentication token found.');
    }
  
    const response = await fetch('/api/student/getByEmail', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error(`🔴 ERROR: Request failed with status ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  }
  

  export { studentLogin, studentRegister };
  