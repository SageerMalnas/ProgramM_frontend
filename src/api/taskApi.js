const API_URL = import.meta.env.VITE_API_BASE_URL;


// Helper function to handle fetch requests
const fetchWithAuth = async (url, method, token, body = null) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const options = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Something went wrong');
  }

  return await res.json();
};

// API functions

export const getTasks = (range, token) => {
  return fetchWithAuth(`${API_URL}/api/task`, 'GET', token);
};

export const updateTask = (taskId, updates, token) => {
  return fetchWithAuth(`${API_URL}/api/task/${taskId}`, 'PATCH', token, updates);
};

export const addTask = (task, token) => {
  return fetchWithAuth(`${API_URL}/api/task`, 'POST', token, task);
};

export const deleteTask = (taskId, token) => {
  return fetchWithAuth(`${API_URL}/api/task/${taskId}`, 'DELETE', token);
};

export const getAnalytics = (token) => {
  return fetchWithAuth(`${API_URL}/api/task/analytics`, 'GET', token);
};