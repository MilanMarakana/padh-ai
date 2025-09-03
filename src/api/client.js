const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

let authToken = null;

export const setToken = (token) => {
  authToken = token;
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
};

export const getToken = () => authToken || localStorage.getItem('token');

async function request(path, options = {}) {
  const headers = Object.assign({ 'Content-Type': 'application/json' }, options.headers || {});
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const error = new Error(data?.message || 'Request failed');
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}

export const api = {
  // Auth
  signup: (payload) => request('/auth/signup', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  me: () => request('/auth/me'),

  // Test
  getQuestions: () => request('/test/questions'),
  submitTest: (payload) => request('/test/submit', { method: 'POST', body: JSON.stringify(payload) }),
  getResults: (query = '') => request(`/test/results${query}`),
  getStats: () => request('/test/stats'),

  // User
  getDashboard: () => request('/user/dashboard'),
};

export default api;
