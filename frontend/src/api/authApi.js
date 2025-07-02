import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const loginAdmin = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/login`, credentials);
    localStorage.setItem('authToken', response.data.token);
    localStorage.setItem('userRole', 'admin');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Admin login failed');
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, credentials);
    localStorage.setItem('authToken', response.data.token);
    localStorage.setItem('userRole', 'user');
    localStorage.setItem('userData', JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'User login failed');
  }
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userData');
};