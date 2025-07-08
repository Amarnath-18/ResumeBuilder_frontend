import axios from 'axios';

const API = axios.create({
  baseURL: 'https://resumebuilder-backend-yy95.onrender.com/api',
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