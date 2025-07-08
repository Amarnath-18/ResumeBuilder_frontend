import axios from 'axios';

// Use environment variable or fallback to production URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://resumebuilder-backend-yy95.onrender.com/api';

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const checkAuthStatus = async () => {
  try {
    const response = await API.get('/auth/current-user');
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default API;