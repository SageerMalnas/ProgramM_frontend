import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Register API call
const register = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/api/users/register`, userData);
    return response.data;
};

// Login API call
const login = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/api/users/login`, userData);
    return response.data;
};

// Logout API call
const logout = () => {
    localStorage.removeItem('user');
};

const authApi = { register, login, logout };

export default authApi;
